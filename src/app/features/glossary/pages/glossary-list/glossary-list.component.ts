import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/services/seo.service';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { GLOSSARY_TERMS, GlossaryTerm } from '../../data/glossary.data';

@Component({
  selector: 'app-glossary-list',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './glossary-list.component.html',
  styleUrl: './glossary-list.component.scss',
})
export class GlossaryListComponent implements OnInit {
  readonly terms = GLOSSARY_TERMS;
  readonly categories = ['All', 'Infrastructure', 'Performance', 'Security', 'Management'] as const;

  selectedCategory = signal<string>('All');

  filteredTerms = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.terms;
    return this.terms.filter((t) => t.category === cat);
  });

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Web Hosting Glossary: Hosting Terms & Technical Concepts Explained',
      description:
        'Explore our comprehensive hosting glossary: clear, educational explanations of web hosting terms, VPS, cloud, NVMe, SSL, bandwidth, and control panels.',
      path: '/glossary',
    });
  }

  selectCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }
}

