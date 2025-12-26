import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  // Layout اصلی (با Navbar)
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout')
        .then(m => m.MainLayout),
    children: [

      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home').then(m => m.Home)
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [authGuard]
      },

      {
        path: 'cases',
        loadComponent: () =>
          import('./pages/cases/cases').then(m => m.Cases),
        canActivate: [authGuard]
      },

      {
        path: 'create-case',
        loadComponent: () =>
          import('./pages/create-case/create-case').then(m => m.CreateCase),
        canActivate: [authGuard]
      }
    ]
  },

  // Login بدون Navbar
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login)
  },

  {
    path: '**',
    redirectTo: ''
  }
];
