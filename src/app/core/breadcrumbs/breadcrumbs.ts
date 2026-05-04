import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (breadcrumbs().length) {
      <nav class="breadcrumbs">
        @for (crumb of breadcrumbs(); track crumb.url) {
          @if (!$last) {
            <a [routerLink]="crumb.url" class="breadcrumbs-item">
              {{ crumb.label }}
            </a>
          } @else {
            <span class="breadcrumbs-item" aria-current="page">
              {{ crumb.label }}
            </span>
          }
        }
      </nav>
    }
  `,
  styleUrl: './breadcrumbs.scss',
})
export class BreadCrumbs {
  private readonly breadcrumbService = inject(BreadcrumbService);
  readonly breadcrumbs = this.breadcrumbService.breadcrumbs;
}
