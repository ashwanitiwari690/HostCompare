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
        { label: 'Domain Search', path: '/domains' },
      ],
    },
    {
      title: 'Comparisons',
      links: [
        { label: 'Compare Hosting', path: '/compare' },
        { label: 'Domain Comparison', path: '/domain-comparison' },
        { label: 'Hostinger vs Bluehost', path: '/compare/hostinger-vs-bluehost' },
        { label: 'Hostinger vs SiteGround', path: '/compare/hostinger-vs-siteground' },
        { label: 'DigitalOcean vs Vultr', path: '/compare/digitalocean-vs-vultr' },
      ],
    },
    {
      title: 'Education',
      links: [
        { label: 'Hosting Guides', path: '/guides' },
        { label: 'Hosting Glossary', path: '/glossary' },
        { label: 'Our Methodology', path: '/methodology' },
        { label: 'Editorial Reviews', path: '/reviews' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Contact Us', path: '/contact' },
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
