import { Routes } from '@angular/router';
import { FilmList } from './films/film-list/film-list';
import { FilmDetail } from './films/film-details/film-details';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'films', pathMatch: 'full' },
  { path: 'films', component: FilmList, data: { breadcrumb: 'Films list' } },
  {
    path: 'films/:id',
    component: FilmDetail,
  },
  { path: '404', component: NotFound },
  { path: '**', redirectTo: '404' },
];
