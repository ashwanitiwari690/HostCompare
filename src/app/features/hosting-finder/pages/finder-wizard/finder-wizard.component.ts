import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FinderAnswers, HostingRecommendation } from '../../../../core/models';
import { CompareSelectionService, MAX_COMPARE_PROVIDERS } from '../../../../core/services/compare-selection.service';
import { SeoService } from '../../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { FinderProgressComponent } from '../../components/finder-progress.component';
import { RecommendationCardComponent } from '../../components/recommendation-card.component';
import { FINDER_QUESTIONS, FinderService } from '../../services/finder.service';

@Component({
  selector: 'app-finder-wizard',
  standalone: true,
  imports: [BreadcrumbComponent, FinderProgressComponent, RecommendationCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './finder-wizard.component.html',
  styleUrl: './finder-wizard.component.scss',
})
export class FinderWizardComponent implements OnInit {
  readonly questions = FINDER_QUESTIONS;

  showResults = signal(false);
  recommendations = signal<HostingRecommendation[]>([]);

  currentQuestion = computed(() => this.questions[this.finder.currentStep() - 1]);

  constructor(
    protected finder: FinderService,
    protected compareSelection: CompareSelectionService,
    private seo: SeoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Hosting Finder: Get a Personalized Hosting Recommendation',
      description:
        'Answer a few questions about your website, budget and technical needs and get a transparent, explained hosting recommendation.',
      path: '/hosting-finder',
    });
  }

  isSelected(value: string): boolean {
    const question = this.currentQuestion();
    const current = this.finder.answers()[question.id];
    return question.type === 'boolean' ? String(current) === value : current === value;
  }

  selectOption(value: string): void {
    const question = this.currentQuestion();
    const parsedValue = question.type === 'boolean' ? value === 'true' : value;
    this.finder.answerQuestion(question.id, parsedValue as FinderAnswers[typeof question.id]);

    if (this.finder.currentStep() < this.finder.totalSteps) {
      this.finder.nextStep();
    } else {
      this.generateRecommendations();
    }
  }

  goBack(): void {
    this.finder.previousStep();
  }

  generateRecommendations(): void {
    this.recommendations.set(this.finder.getRecommendations(5));
    this.showResults.set(true);
  }

  restart(): void {
    this.finder.reset();
    this.showResults.set(false);
    this.recommendations.set([]);
  }

  goToComparison(): void {
    this.router.navigate(['/compare']);
  }

  get maxCompare(): number {
    return MAX_COMPARE_PROVIDERS;
  }
}
