import { ChangeDetectionStrategy, Component, OnInit, computed, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/services/seo.service';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { FaqAccordionComponent } from '../../../../shared/components/faq-accordion/faq-accordion.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { GLOSSARY_TERMS, GlossaryTerm, getGlossaryTermBySlug } from '../../data/glossary.data';

@Component({
  selector: 'app-glossary-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, BadgeComponent, IconComponent, FaqAccordionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './glossary-detail.component.html',
  styleUrl: './glossary-detail.component.scss',
})
export class GlossaryDetailComponent implements OnInit {
  slug = input.required<string>();

  term = signal<GlossaryTerm | null>(null);

  relatedTerms = computed(() => {
    const current = this.term();
    if (!current) return [];
    return GLOSSARY_TERMS.filter((t) => current.relatedTermSlugs.includes(t.slug));
  });

  constructor(
    private router: Router,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    const found = getGlossaryTermBySlug(this.slug());
    if (!found) {
      this.router.navigate(['/glossary']);
      return;
    }

    this.term.set(found);

    this.seo.setPage({
      title: `${found.term}: What It Is & How It Works | Hosting Glossary`,
      description: found.shortDefinition,
      path: `/glossary/${found.slug}`,
      type: 'article',
    });

    if (found.faqs.length > 0) {
      this.seo.setJsonLd(
        `glossary-${found.slug}-faq`,
        this.seo.buildFaqJsonLd(found.faqs),
      );
    }
  }
}

