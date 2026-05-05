import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService, Film } from '../film.service';

import { AutofocusDirective } from '../../shared/autofocus.directive';
import { FilmCard } from './components/film-card/film-card';

@Component({
  selector: 'app-film-list',
  imports: [AutofocusDirective, FilmCard],
  standalone: true,
  templateUrl: './film-list.html',
  styleUrl: './film-list.scss',
})
export class FilmList {
  private readonly filmsService = inject(FilmsService);
  private readonly router = inject(Router);
  readonly films = this.filmsService.films;
  readonly favorites = this.filmsService.favorites;
  readonly search = signal('');
  readonly showFavoritesOnly = signal(false);

  readonly sourceFilms = computed(() =>
    this.showFavoritesOnly() ? this.filmsService.favorites() : this.films(),
  );

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.search.set(target?.value ?? '');
  }

  readonly filteredFilms = computed(() => {
    const q = this.search().trim().toLowerCase();
    const source = this.sourceFilms();

    if (!q) {
      return source;
    }

    return source.filter((film) => film.title.toLowerCase().includes(q));
  });

  openDetails(film: Film): void {
    this.router.navigate(['/films', film.id], {
      state: { filmTitle: film.title },
    });
  }

  toggleFavorite(film: Film): void {
    this.filmsService.toggleFavorite(film.id);
  }

  toggleShowFavorites(): void {
    this.showFavoritesOnly.update((v) => !v);
  }
}
