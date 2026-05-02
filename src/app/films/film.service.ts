import { Injectable, computed, signal } from '@angular/core';
import filmsData from './films.json';

export interface Film {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  duration: number;
  description: string;
  posterUrl: string;
  isFavorite: boolean;
}

@Injectable({ providedIn: 'root' })
export class FilmsService {
  films = signal<Film[]>(filmsData as Film[]);

  favorites = computed(() => this.films().filter((film) => film.isFavorite));

  toggleFavorite(id: number): void {
    this.films.update((films) =>
      films.map((film) => (film.id === id ? { ...film, favorite: !film.isFavorite } : film)),
    );
  }

  getFilmById(id: number): Film | undefined {
    return this.films().find((film) => film.id === id);
  }
}
