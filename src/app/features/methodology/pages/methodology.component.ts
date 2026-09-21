import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { FaqAccordionComponent } from '../../../shared/components/faq-accordion/faq-accordion.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-methodology',
  standalone: true,
  imports: [BreadcrumbComponent, FaqAccordionComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './methodology.component.html',
  styleUrl: './methodology.component.scss',
})
export class MethodologyComponent implements OnInit {
  readonly faqs = [
    {
      question: 'Can hosting companies pay to improve their rating on HostCompare?',
      answer:
        'No. Editorial ratings and rankings are strictly independent. Providers cannot pay to alter scores, delete critical observations, or purchase higher placement in our comparison tools.',
    },
    {
      question: 'How often do you update hosting prices and plan features?',
      answer:
        'We review pricing and plan inclusions on a routine quarterly cycle and whenever major product shifts or promotional adjustments are officially announced by providers. The date of our most recent review is listed on each provider profile.',
    },
    {
      question: 'Why do you differentiate between introductory and renewal prices?',
      answer:
        'Most shared and cloud hosting providers heavily discount the first billing term (often up to 70-80% off). If website owners do not factor in renewal rates, their hosting bills can jump dramatically after the first year. We report both rates clearly to help users budget accurately.',
    },
    {
      question: 'How can I submit a correction or report outdated information?',
      answer:
        'We appreciate reader submissions. Please email our editorial team at ashwini12tiwari@gmail.com with the provider name, URL, and verifiable reference. Our editors verify and update listings accordingly.',
    },
  ];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Our Hosting Comparison Methodology & Research Standards',
      description:
        'Learn how HostCompare evaluates web hosting providers: our criteria for performance, pricing transparency, uptime guarantees, security, and editorial independence.',
      path: '/methodology',
    });

    this.seo.setJsonLd(
      'methodology-faq-jsonld',
      this.seo.buildFaqJsonLd(this.faqs),
    );
  }
}
