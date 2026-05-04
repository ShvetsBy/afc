import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Film } from '../../../film.service';

@Component({
  selector: 'app-film-card',
  imports: [],
  templateUrl: './film-card.html',
  styleUrl: './film-card.scss',
})
export class FilmCard {
  @Input({ required: true }) film!: Film;
  @Output() open = new EventEmitter<Film>();
  @Output() toggleFavorite = new EventEmitter<Film>();

  onCardClick(): void {
    this.open.emit(this.film);
  }

  onFavoriteClick(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.film);
  }
}
