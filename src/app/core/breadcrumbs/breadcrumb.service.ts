import { Injectable, signal } from '@angular/core';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  readonly breadcrumbs = signal<Breadcrumb[]>([]);

  setListBreadcrumb(): void {
    this.breadcrumbs.set([{ label: 'Films list', url: '/films' }]);
  }

  setFilmBreadcrumb(title: string, id: number): void {
    this.breadcrumbs.set([
      { label: 'Films list', url: '/films' },
      { label: title, url: `/films/${id}` },
    ]);
  }

  setNotFoundBreadcrumb(): void {
    this.breadcrumbs.set([
      { label: 'Films list', url: '/films' },
      { label: 'Page not found', url: '/404' },
    ]);
  }
}
