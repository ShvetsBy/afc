import { Component, inject } from '@angular/core';
import { BreadcrumbService } from '../../core/breadcrumbs/breadcrumb.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly breadcrumbService = inject(BreadcrumbService);
}
