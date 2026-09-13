import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { ContentBlocksComponent } from '../../../../shared/components/content-blocks/content-blocks.component';
import { LegalPage, getLegalPageBySlug } from '../../data/legal-pages.data';

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [BreadcrumbComponent, ContentBlocksComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './legal-page.component.html',
  styleUrl: './legal-page.component.scss',
})
export class LegalPageComponent implements OnInit {
  page = signal<LegalPage | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const slug = data['legalSlug'] as string;
      const page = getLegalPageBySlug(slug);
      if (!page) {
        this.router.navigate(['/404']);
        return;
      }
      this.page.set(page);
      this.seo.setPage({
        title: page.title,
        description: page.intro,
        path: `/${page.slug}`,
      });
    });
  }
}
