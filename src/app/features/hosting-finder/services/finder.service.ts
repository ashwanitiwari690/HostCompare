import { Injectable, computed, effect, inject, signal } from '@angular/core';
import {
  BudgetRange,
  FinderAnswers,
  FinderQuestion,
  HostingProvider,
  HostingRecommendation,
  HostingType,
  ScoreWeights,
  WebsiteType,
} from '../../../core/models';
import { HostingService } from '../../../core/services/hosting.service';
import { StorageService } from '../../../core/services/storage.service';

const STORAGE_KEY = 'hostcompare-finder-answers';

const DEFAULT_ANSWERS: FinderAnswers = {
  websiteType: null,
  experience: null,
  traffic: null,
  budget: null,
  needsWordpress: null,
  needsVps: null,
  needsEmail: null,
};

/** Transparent scoring weights — see docs/README "Recommendation algorithm". */
export const FINDER_WEIGHTS: ScoreWeights = {
  budget: 0.25,
  hostingType: 0.2,
  requiredFeatures: 0.2,
  performance: 0.15,
  wordpressVps: 0.1,
  support: 0.1,
};

const BUDGET_MAX_PRICE: Record<BudgetRange, number> = {
  'under-100': 100,
  '100-300': 300,
  '300-700': 700,
  '700-plus': Infinity,
};

const BUDGET_LABELS: Record<BudgetRange, string> = {
  'under-100': 'under ₹100/mo',
  '100-300': '₹100–300/mo',
  '300-700': '₹300–700/mo',
  '700-plus': '₹700+/mo',
};

const WEBSITE_TYPE_HOSTING_MAP: Record<WebsiteType, HostingType[]> = {
  blog: ['shared', 'wordpress'],
  business: ['shared', 'wordpress', 'cloud'],
  ecommerce: ['wordpress', 'cloud', 'vps'],
  portfolio: ['shared', 'wordpress'],
  saas: ['vps', 'cloud'],
  developer: ['vps', 'cloud'],
};

const WEBSITE_TYPE_LABELS: Record<WebsiteType, string> = {
  blog: 'blog',
  business: 'business',
  ecommerce: 'ecommerce store',
  portfolio: 'portfolio',
  saas: 'SaaS product',
  developer: 'developer project',
};

export const FINDER_QUESTIONS: FinderQuestion[] = [
  {
    id: 'websiteType', step: 1, question: 'What type of website are you building?',
    helpText: 'This helps us match you with hosting built for your kind of project.',
    type: 'single',
    options: [
      { value: 'blog', label: 'Blog' },
      { value: 'business', label: 'Business' },
      { value: 'ecommerce', label: 'Ecommerce' },
      { value: 'portfolio', label: 'Portfolio' },
      { value: 'saas', label: 'SaaS' },
      { value: 'developer', label: 'Developer Project' },
    ],
  },
  {
    id: 'experience', step: 2, question: "What's your experience level?",
    helpText: 'We weigh support and ease of use differently depending on your comfort level.',
    type: 'single',
    options: [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' },
    ],
  },
  {
    id: 'traffic', step: 3, question: 'What traffic do you expect?',
    helpText: 'Higher expected traffic favors providers with stronger performance and scalability.',
    type: 'single',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ],
  },
  {
    id: 'budget', step: 4, question: 'What is your monthly budget?',
    helpText: 'We only recommend providers that realistically fit your budget.',
    type: 'single',
    options: [
      { value: 'under-100', label: 'Under ₹100' },
      { value: '100-300', label: '₹100–300' },
      { value: '300-700', label: '₹300–700' },
      { value: '700-plus', label: '₹700+' },
    ],
  },
  {
    id: 'needsWordpress', step: 5, question: 'Do you need WordPress?',
    helpText: 'We will prioritize providers with strong WordPress support.',
    type: 'boolean',
    options: [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' },
    ],
  },
  {
    id: 'needsVps', step: 6, question: 'Do you need VPS?',
    helpText: 'We will prioritize providers offering VPS or cloud plans.',
    type: 'boolean',
    options: [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' },
    ],
  },
  {
    id: 'needsEmail', step: 7, question: 'Do you need business email hosting?',
    helpText: 'We will prioritize providers that include free email hosting.',
    type: 'boolean',
    options: [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class FinderService {
  private readonly hosting = inject(HostingService);
  private readonly storage = inject(StorageService);

  private readonly _answers = signal<FinderAnswers>(this.storage.get<FinderAnswers>(STORAGE_KEY, DEFAULT_ANSWERS));

  readonly answers = this._answers.asReadonly();
  readonly currentStep = signal(1);
  readonly totalSteps = FINDER_QUESTIONS.length;

  readonly isComplete = computed(() => {
    const a = this._answers();
    return Object.values(a).every((v) => v !== null);
  });

  constructor() {
    effect(() => this.storage.set(STORAGE_KEY, this._answers()));
  }

  answerQuestion<K extends keyof FinderAnswers>(id: K, value: FinderAnswers[K]): void {
    this._answers.update((a) => ({ ...a, [id]: value }));
  }

  goToStep(step: number): void {
    this.currentStep.set(Math.max(1, Math.min(step, this.totalSteps)));
  }

  nextStep(): void {
    this.goToStep(this.currentStep() + 1);
  }

  previousStep(): void {
    this.goToStep(this.currentStep() - 1);
  }

  reset(): void {
    this._answers.set(DEFAULT_ANSWERS);
    this.currentStep.set(1);
  }

  /**
   * Transparent, weighted scoring — see FINDER_WEIGHTS. Every factor is
   * explainable so recommendations can say *why* a provider matched instead
   * of just asserting it is "the best".
   */
  getRecommendations(maxResults = 5): HostingRecommendation[] {
    const answers = this._answers();
    let providers: HostingProvider[] = [];
    this.hosting.getProviders().subscribe((list) => (providers = list));

    const scored = providers.map((provider) => {
      const budgetScore = this.scoreBudget(provider, answers);
      const hostingTypeScore = this.scoreHostingType(provider, answers);
      const featuresScore = this.scoreRequiredFeatures(provider, answers);
      const performanceScore = this.scorePerformance(provider, answers);
      const wordpressVpsScore = this.scoreWordpressVps(provider, answers);
      const supportScore = this.scoreSupport(provider, answers);

      const matchScore = Math.round(
        budgetScore * FINDER_WEIGHTS.budget +
          hostingTypeScore * FINDER_WEIGHTS.hostingType +
          featuresScore * FINDER_WEIGHTS.requiredFeatures +
          performanceScore * FINDER_WEIGHTS.performance +
          wordpressVpsScore * FINDER_WEIGHTS.wordpressVps +
          supportScore * FINDER_WEIGHTS.support,
      );

      return {
        provider,
        matchScore,
        reasons: this.buildReasons(provider, answers, {
          budgetScore,
          hostingTypeScore,
          featuresScore,
          performanceScore,
          wordpressVpsScore,
          supportScore,
        }),
        matchingFeatures: provider.keyFeatures.slice(0, 4),
      };
    });

    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, maxResults);
  }

  private scoreBudget(provider: HostingProvider, answers: FinderAnswers): number {
    if (!answers.budget) return 70;
    const max = BUDGET_MAX_PRICE[answers.budget];
    if (!isFinite(max)) return 100;
    if (provider.startingPrice <= max) return 100;
    const overRatio = (provider.startingPrice - max) / max;
    return Math.max(0, Math.round(100 - overRatio * 100));
  }

  private scoreHostingType(provider: HostingProvider, answers: FinderAnswers): number {
    if (!answers.websiteType) return 60;
    const preferred = WEBSITE_TYPE_HOSTING_MAP[answers.websiteType];
    const matches = preferred.filter((t) => provider.hostingTypes.includes(t)).length;
    if (matches === 0) return 20;
    return Math.round((matches / preferred.length) * 100);
  }

  private scoreRequiredFeatures(provider: HostingProvider, answers: FinderAnswers): number {
    let checks = 3;
    let passed = [provider.freeSsl, provider.freeBackup, provider.freeDomain].filter(Boolean).length;
    if (answers.needsEmail) {
      checks += 1;
      if (provider.freeEmail) passed += 1;
    }
    return Math.round((passed / checks) * 100);
  }

  private scoreWordpressVps(provider: HostingProvider, answers: FinderAnswers): number {
    const checks: boolean[] = [];
    if (answers.needsWordpress) checks.push(provider.hostingTypes.includes('wordpress'));
    if (answers.needsVps) checks.push(provider.hostingTypes.includes('vps') || provider.hostingTypes.includes('cloud'));
    if (!checks.length) return 100;
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }

  private scorePerformance(provider: HostingProvider, answers: FinderAnswers): number {
    const base = (provider.rating.performance / 5) * 100;
    if (answers.traffic === 'high') {
      const bonus = provider.hostingTypes.some((t) => ['vps', 'cloud', 'dedicated'].includes(t)) ? 10 : -15;
      return Math.max(0, Math.min(100, base + bonus));
    }
    return base;
  }

  private scoreSupport(provider: HostingProvider, answers: FinderAnswers): number {
    const base = (provider.rating.support / 5) * 100;
    if (answers.experience === 'beginner') {
      const bonus = provider.supportChannels.some((c) => c.toLowerCase().includes('phone')) ? 10 : 0;
      return Math.min(100, base + bonus);
    }
    return base;
  }

  private buildReasons(
    provider: HostingProvider,
    answers: FinderAnswers,
    scores: { budgetScore: number; hostingTypeScore: number; featuresScore: number; performanceScore: number; wordpressVpsScore: number; supportScore: number },
  ): string[] {
    const reasons: string[] = [];

    if (answers.budget && scores.budgetScore >= 70) {
      reasons.push(`Matches your ${BUDGET_LABELS[answers.budget]} budget`);
    }
    if (answers.websiteType && scores.hostingTypeScore >= 70) {
      reasons.push(`Offers hosting well-suited to a ${WEBSITE_TYPE_LABELS[answers.websiteType]}`);
    }
    if (answers.needsWordpress && provider.hostingTypes.includes('wordpress')) {
      reasons.push('Includes managed WordPress hosting');
    }
    if (answers.needsVps && (provider.hostingTypes.includes('vps') || provider.hostingTypes.includes('cloud'))) {
      reasons.push('Offers VPS/cloud plans for more scalability');
    }
    if (answers.needsEmail && provider.freeEmail) {
      reasons.push('Includes business email hosting');
    }
    if (answers.traffic === 'high' && scores.performanceScore >= 70) {
      reasons.push('Strong performance rating for higher-traffic sites');
    }
    if (answers.experience === 'beginner' && scores.supportScore >= 70) {
      reasons.push('Support channels well-suited to beginners');
    }
    if (reasons.length === 0) {
      reasons.push('Balanced overall match across price, features and performance');
    }
    return reasons;
  }
}
