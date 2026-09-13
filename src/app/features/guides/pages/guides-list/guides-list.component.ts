import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { Guide, GuideCategory } from '../../../../core/models';
import { GuidesService } from '../../../../core/services/guides.service';
import { SeoService } from '../../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { GuideCardComponent } from '../../../../shared/components/guide-card/guide-card.component';

const CATEGORIES: (GuideCategory | 'All')[] = [
  'All',
  'Hosting',
  'Domains',
  'WordPress',
  'VPS',
  'Cloud',
  'Website',
  'Security',
  'Performance',
  'Email',
  'Developer',
];

@Component({
  selector: 'app-guides-list',
  standalone: true,
  imports: [BreadcrumbComponent, GuideCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './guides-list.component.html',
  styleUrl: './guides-list.component.scss',
})
export class GuidesListComponent implements OnInit {
  readonly categories = CATEGORIES;
  allGuides = signal<Guide[]>([]);
  activeCategory = signal<(typeof CATEGORIES)[number]>('All');

  filteredGuides = computed(() => {
    const category = this.activeCategory();
    const guides = this.allGuides();
    return category === 'All' ? guides : guides.filter((g) => g.category === category);
  });

  constructor(
    private guidesService: GuidesService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Hosting, Domain & WordPress Guides',
      description: 'Practical, jargon-free guides covering hosting, domains, WordPress, VPS, cloud, security, performance and more.',
      path: '/guides',
    });

    this.guidesService.getGuides().subscribe((guides) => this.allGuides.set(guides));
  }

  setCategory(category: (typeof CATEGORIES)[number]): void {
    this.activeCategory.set(category);
  }
}
