// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard'; 

export const routes: Routes = [
  
  // 1. ROTAS NÃO PROTEGIDAS (Acessíveis a todos)
  
  // Rota de Login (Componente Login exportado de auth.ts)
  {
    path: 'login',
    loadComponent: () => 
      import('./pages/auth/auth') 
      .then(c => c.Login), // <-- Componente Login de auth.ts
    title: 'Login - EndGame'
  },
  
  // Rota de Cadastro (Componente Register exportado de register.ts)
  {
    path: 'register',
    loadComponent: () => 
      import('./pages/auth/register') 
      .then(c => c.Register),
    title: 'Cadastro - EndGame'
  },
  
  
  // 2. ROTA PROTETIDA PRINCIPAL
  // Toda rota que cair aqui primeiro passa pelo AuthGuard.
  {
    path: '', // Rota raiz agora é a rota protegida
    canActivate: [AuthGuard], // Aplica o Guard
    children: [
      
      // Sub-rota: Redireciona a raiz ('/') para o Dashboard, APENAS SE ESTIVER LOGADO.
      {
        path: '', 
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      
      // Sub-rota: Dashboard
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard')
          .then(c => c.Dashboard),
        title: 'GameLog - Dashboard'
      },
      
      // Sub-rota: Gerenciamento de Jogos
      {
        path: 'games',
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
          },
          // Rota de Detalhes
          {
            path: ':id',
            loadComponent: () => import('./pages/game-details/game-details')
              .then(c => c.GameDetails)
          }
        ]
      }
    ]
  },
  
  // 3. Rota Wildcard (404)
  {
    path: '**',
    redirectTo: 'login' // Manda qualquer rota desconhecida para o login
  }
];