import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'exercicio1',
    loadComponent: () => import('./pages/exercicio1/exercicio1.page').then( m => m.Exercicio1Page)
  },
];
