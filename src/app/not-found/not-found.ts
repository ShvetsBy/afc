import { Component, inject } from '@angular/core';
import { BreadcrumbService } from '../core/breadcrumbs/breadcrumb.service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  private readonly breadcrumbService = inject(BreadcrumbService);

  constructor() {
    this.breadcrumbService.setNotFoundBreadcrumb();
  }
}
