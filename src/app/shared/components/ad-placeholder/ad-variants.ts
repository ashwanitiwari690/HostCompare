import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdPlaceholderComponent } from './ad-placeholder.component';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [AdPlaceholderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-ad-placeholder format="banner" />`,
})
export class AdBannerComponent {}

@Component({
  selector: 'app-ad-in-article',
  standalone: true,
  imports: [AdPlaceholderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-ad-placeholder format="in-article" />`,
})
export class AdInArticleComponent {}

@Component({
  selector: 'app-ad-sidebar',
  standalone: true,
  imports: [AdPlaceholderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-ad-placeholder format="sidebar" />`,
})
export class AdSidebarComponent {}

@Component({
  selector: 'app-ad-rectangle',
  standalone: true,
  imports: [AdPlaceholderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-ad-placeholder format="rectangle" />`,
})
export class AdRectangleComponent {}
