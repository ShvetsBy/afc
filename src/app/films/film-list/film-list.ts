import { Component, computed, inject, signal } from '@angular/core';
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
  readonly films = this.filmsService.films;
  readonly search = signal('');
  private readonly breadcrumbService = inject(BreadcrumbService);

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.search.set(target?.value ?? '');
  }

  readonly filteredFilms = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) {
      return this.films();
    }

    return this.films().filter((film) => film.title.toLowerCase().includes(q));
  });

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
