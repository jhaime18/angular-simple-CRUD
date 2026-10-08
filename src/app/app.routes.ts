import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ran-stats/ran-stats-page/ran-stats-page').then((m) => m.RanStatsPage),
  },
];
