// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard'; 

export const routes: Routes = [
  // Rota de Login/Autenticação (Corrigida de c.Auth para c.Login)
  {
    path: 'login',
    loadComponent: () => 
      import('./pages/auth/auth') 
      .then(c => c.Login), // <--- CORREÇÃO
    title: 'Login - EndGame'
  },
  
  // Rota de Cadastro (NOVA)
  {
    path: 'register',
    loadComponent: () => 
      import('./pages/auth/register') 
      .then(c => c.Register),
    title: 'Cadastro - EndGame'
  },
  
  // Rota Principal
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  
  // Rotas Protegidas (Dashboard e Jogos)
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard')
      .then(c => c.Dashboard),
    canActivate: [AuthGuard],
    title: 'GameLog - Dashboard'
  },
  {
    path: 'games',
    canActivate: [AuthGuard],
    children: [
      {
        path: '', 
        loadComponent: () => import('./pages/game-list/game-list')
          .then(c => c.GameList),
        title: 'Meus Jogos'
      },
      {
        path: 'new', 
        loadComponent: () => import('./pages/game-form/game-form')
          .then(c => c.GameForm)
      }
    ]
  },
  
  // Rota Wildcard (404)
  {
    path: '**',
    redirectTo: 'dashboard'
    // Você pode criar um componente 404/NotFound aqui.
  }
];