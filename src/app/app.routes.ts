import { Routes } from '@angular/router';
import { FilmList } from './films/film-list/film-list';
import { FilmDetail } from './films/film-details/film-details';
import { NotFound } from './pages/not-found/not-found';
import { About } from './pages/about/about';

export const routes: Routes = [
  {
    path: 'films',

    children: [
      {
        path: '',
        component: FilmList,
        data: { breadcrumb: 'Home' },
      },
      {
        path: ':id',
        component: FilmDetail,
        data: { breadcrumb: 'Film details' },
      },
    ],
  },
  { path: 'about', component: About, data: { breadcrumb: 'About' } },
  { path: '404', component: NotFound, data: { breadcrumb: 'Page not found' } },
  { path: '', redirectTo: 'films', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];
