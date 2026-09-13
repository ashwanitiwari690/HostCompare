import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoMarkComponent } from '../../shared/components/logo/logo-mark.component';

interface FooterColumn {
  title: string;
  links: { label: string; path: string }[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LogoMarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly columns: FooterColumn[] = [
    {
      title: 'Hosting',
      links: [
        { label: 'All Hosting', path: '/hosting' },
        { label: 'WordPress Hosting', path: '/wordpress-hosting' },
        { label: 'VPS Hosting', path: '/vps' },
        { label: 'Hosting Finder', path: '/hosting-finder' },
        { label: 'Compare Providers', path: '/compare' },
      ],
    },
    {
      title: 'Domains',
      links: [
        { label: 'Domain Search', path: '/domains' },
        { label: 'Domain Comparison', path: '/domain-comparison' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Reviews', path: '/reviews' },
        { label: 'Guides', path: '/guides' },
        { label: 'Search', path: '/search' },
        { label: 'Favorites', path: '/favorites' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'Affiliate Disclosure', path: '/affiliate-disclosure' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy-policy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Disclaimer', path: '/disclaimer' },
        { label: 'Cookie Policy', path: '/cookie-policy' },
      ],
    },
  ];
}
