import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/auth')
      .then(c => c.Auth),
    title: 'Login - EndGame'
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
  loadComponent: () => import('./pages/dashboard/dashboard') 
    .then(c => c.Dashboard),
  canActivate: [AuthGuard], // protegeninho a rotinha 
  title: 'GameLog - Dashboard'
  },
  // 2. Rota Principal para o Gerenciamento de Jogos
  {
  path: 'games',
  canActivate: [AuthGuard],
    children: [
      {
        path: '', // /games
        loadComponent: () => import('./pages/game-list/game-list') 
          .then(c => c.GameList), 
        title: 'Meus Jogos'
      },
      {
        path: 'new', 
        loadComponent: () => import('./pages/game-form/game-form')
          .then(c => c.GameForm), 
        title: 'Adicionar Jogo'
      },
      {
        path: 'edit/:id', 
        loadComponent: () => import('./pages/game-form/game-form')
          .then(c => c.GameForm), 
        title: 'Editar Jogo'
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/game-details/game-details') 
          .then(c => c.GameDetails), 
        title: 'Detalhes do Jogo'
      },
    ]
},
  // Rota curinga para 404
  { path: '**', redirectTo: 'dashboard' }
];