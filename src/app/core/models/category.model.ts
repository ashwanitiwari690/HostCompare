import { HostingType } from './hosting-provider.model';

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconInitials: string;
  hostingType?: HostingType;
  routerLink: string;
}
