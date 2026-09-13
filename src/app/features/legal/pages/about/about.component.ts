import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { IconComponent, IconName } from '../../../../shared/components/icon/icon.component';

interface ValueItem {
  icon: IconName;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  readonly values: ValueItem[] = [
    { icon: 'scale', title: 'Independent Comparisons', description: 'We compare providers against the same criteria rather than ranking whoever pays the most.' },
    { icon: 'info', title: 'Transparent Methodology', description: 'Our Hosting Finder scoring weights are published openly — see exactly why a provider was recommended.' },
    { icon: 'shield', title: 'Honest Labeling', description: 'Sample data, editorial ratings and affiliate links are clearly labeled — never disguised as something else.' },
    { icon: 'clock', title: 'Practical Content', description: 'Guides are written to actually help you make a decision, not to pad word counts for search engines.' },
  ];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'About HostCompare',
      description: 'HostCompare is an independent hosting and domain comparison platform built to help you choose with confidence.',
      path: '/about',
    });
  }
}
