import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film, FilmsService } from '../film.service';
import { BreadcrumbService } from '../../core/breadcrumbs/breadcrumb.service';
import { DurationPipe } from '../../shared/duration.pipe';

@Component({
  selector: 'app-film-details',
  imports: [DurationPipe],
  templateUrl: './film-details.html',
  styleUrl: './film-details.scss',
})
export class FilmDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly filmsService = inject(FilmsService);
  private readonly breadcrumbService = inject(BreadcrumbService);

  private readonly id = signal(Number(this.route.snapshot.paramMap.get('id')));

  readonly film = computed(() => this.filmsService.getFilmById(this.id()));

  constructor() {
    const idValue = this.id();

    if (!idValue || Number.isNaN(idValue)) {
      this.router.navigate(['/404']);
      return;
    }

    const film = this.film();

    if (!film) {
      this.router.navigate(['/404']);
      return;
    }
  }

  toggleFavorite(): void {
    const film = this.film() as Film | undefined;
    if (!film) return;

    this.filmsService.toggleFavorite(film.id);
  }

  goBack(): void {
    this.router.navigate(['/films']);
  }
}
