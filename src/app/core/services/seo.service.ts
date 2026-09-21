import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface PageSeoData {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}

const SITE_NAME = 'HostCompare';
const DEFAULT_ORIGIN = 'https://host-compare.vercel.app';
const DEFAULT_IMAGE = '/og-image.png';

/**
 * Central place for all document <head> / SEO concerns so feature pages
 * only need to call `seo.setPage(...)` once with the content they already have.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private titleService: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  setPage(data: PageSeoData): void {
    const fullTitle = data.title.includes(SITE_NAME) ? data.title : `${data.title} | ${SITE_NAME}`;
    this.setTitle(fullTitle);
    this.setDescription(data.description);
    this.setCanonical(data.path);
    this.setOpenGraph({
      title: fullTitle,
      description: data.description,
      url: `${DEFAULT_ORIGIN}${data.path}`,
      image: data.image ?? DEFAULT_IMAGE,
      type: data.type ?? 'website',
    });
    this.setTwitterCard({
      title: fullTitle,
      description: data.description,
      image: data.image ?? DEFAULT_IMAGE,
    });
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  setDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }

  setCanonical(path: string): void {
    const href = `${DEFAULT_ORIGIN}${path}`;
    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  setOpenGraph(og: { title: string; description: string; url: string; image: string; type: string }): void {
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:title', content: og.title });
    this.meta.updateTag({ property: 'og:description', content: og.description });
    this.meta.updateTag({ property: 'og:url', content: og.url });
    this.meta.updateTag({ property: 'og:image', content: og.image });
    this.meta.updateTag({ property: 'og:type', content: og.type });
  }

  setTwitterCard(twitter: { title: string; description: string; image: string }): void {
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: twitter.title });
    this.meta.updateTag({ name: 'twitter:description', content: twitter.description });
    this.meta.updateTag({ name: 'twitter:image', content: twitter.image });
  }

  /**
   * Injects a JSON-LD structured data script. Only call this with data that
   * genuinely reflects real page content (see project rule: no fake structured data).
   */
  setJsonLd(id: string, data: Record<string, unknown>): void {
    this.removeJsonLd(id);
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }

  removeJsonLd(id: string): void {
    const existing = this.doc.getElementById(id);
    if (existing) existing.remove();
  }

  buildBreadcrumbJsonLd(items: { name: string; path: string }[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${DEFAULT_ORIGIN}${item.path}`,
      })),
    };
  }

  buildFaqJsonLd(faqs: { question: string; answer: string }[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }
}
