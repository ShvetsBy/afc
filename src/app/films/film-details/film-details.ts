import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film, FilmsService } from '../film.service';
import { BreadcrumbService } from '../../core/breadcrumbs/breadcrumb.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.html',
  styleUrl: './film-details.scss',
})
export class FilmDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly filmsService = inject(FilmsService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  film?: Film;

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    if (!id || Number.isNaN(id)) {
      this.router.navigate(['/films']);
      return;
    }

    const film = this.filmsService.getFilmById(id);

    if (!film) {
      this.router.navigate(['/films']);
      return;
    }

    this.film = film;
    this.breadcrumbService.setFilmBreadcrumb(film.title, film.id);
  }

  goBack(): void {
    this.router.navigate(['/films']);
  }
}
