import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService, Film } from '../film.service';
import { BreadcrumbService } from '../../core/breadcrumbs/breadcrumb.service';

@Component({
  selector: 'app-film-list',
  standalone: true,
  templateUrl: './film-list.html',
  styleUrl: './film-list.scss',
})
export class FilmList {
  private readonly filmsService = inject(FilmsService);
  private readonly router = inject(Router);

  private readonly breadcrumbService = inject(BreadcrumbService);

  constructor() {
    this.breadcrumbService.setListBreadcrumb();
  }

  films = this.filmsService.films;

  openDetails(film: Film): void {
    this.router.navigate(['/films', film.id], {
      state: { filmTitle: film.title },
    });
  }

  toggleFavorite(film: Film, event: MouseEvent): void {
    event.stopPropagation();
    this.filmsService.toggleFavorite(film.id);
  }
}
