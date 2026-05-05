import { Injectable, signal, computed, inject } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FilmsService } from '../../films/film.service';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly router = inject(Router);
  private readonly filmsService = inject(FilmsService);

  private readonly _breadcrumbs = signal<Breadcrumb[]>([]);
  readonly breadcrumbs = computed(() => this._breadcrumbs());

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const crumbs: Breadcrumb[] = [];
      this.buildBreadcrumbs(root, '', crumbs);
      if (!crumbs.length || crumbs[0].url !== '/films') {
        crumbs.unshift({ label: 'Home', url: '/films' });
      }

      this._breadcrumbs.set(crumbs);
    });
  }

  private buildBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url: string,
    breadcrumbs: Breadcrumb[],
  ): void {
    const children = route.children;

    if (!children || !children.length) {
      return;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      const routeURL = child.url.map((s) => s.path).join('/');
      const nextUrl = routeURL ? `${url}/${routeURL}` : url;

      if (child.data && child.data['breadcrumb']) {
        let label = child.data['breadcrumb'] as string;

        if (child.routeConfig?.path === ':id') {
          const id = Number(child.params['id']);
          const film = this.filmsService.getFilmById(id);
          if (film) {
            label = film.title;
          }
        }

        breadcrumbs.push({
          label,
          url: nextUrl || '/',
        });
      }

      this.buildBreadcrumbs(child, nextUrl, breadcrumbs);
    }
  }
}
