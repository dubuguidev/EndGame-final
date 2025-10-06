// src/app/app.routes.ts

import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1. Rota de Dashboard (Home)
  // Geralmente, para a primeira rota, definimos o componente diretamente.
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    // Usamos loadComponent para lazy-loading de componentes Standalone
    loadComponent: () => import('./pages/dashboard/dashboard')
      .then(c => c.Dashboard),
    title: 'GameLog - Dashboard'
  },
  // 2. Rota Principal para o Gerenciamento de Jogos
  {
  path: 'games',
  children: [
    {
      path: '', // /games
      loadComponent: () => import('./pages/game-list/game-list')
        .then(c => c.GameList),
      title: 'Meus Jogos'
    },
    {
      path: 'new', // /games/new
      loadComponent: () => import('./pages/game-form/game-form')
        .then(c => c.GameForm),
      title: 'Adicionar Jogo'
    },
    {
      path: 'edit/:id', // /games/edit/123
      loadComponent: () => import('./pages/game-form/game-form')
        .then(c => c.GameForm),
      title: 'Editar Jogo'
    },
    {
      path: ':id', // /games/123
      loadComponent: () => import('./pages/game-details/game-details')
        .then(c => c.GameDetails), 
      title: 'Detalhes do Jogo'
    },
  ]
},
  // Rota curinga para 404
  { path: '**', redirectTo: 'dashboard' }
];