// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard'; // 🚨 CORREÇÃO: Usamos o Guard do core
// NOTA: O ofuscamento na linha 4 é um aviso do seu editor, não um erro fatal.

export const routes: Routes = [
    
    // 1. ROTAS NÃO PROTEGIDAS (Autenticação)
    
    // Rota Raiz: Redireciona para a tela de Login (prioridade)
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    
    // Rota de Login (Aponta para o novo componente Login)
    { 
        path: 'login', 
        loadComponent: () => import('./pages/auth/login/login').then(c => c.Login),
        title: 'Login - EndGame'
    },
    
    // Rota de Cadastro
    { 
        path: 'register', 
        loadComponent: () => import('./pages/auth/register').then(c => c.Register),
        title: 'Cadastro - EndGame'
    },

    
    // 2. ROTA PROTEGIDA PRINCIPAL (Exige Autenticação)
    
    {
        path: 'app', // URL principal protegida: /app/dashboard
        canActivate: [authGuard], 
        children: [
            
            // Sub-rota: Redireciona /app para /app/dashboard
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            
            // Dashboard (Onde está o carrossel)
            { 
                path: 'dashboard', 
                loadComponent: () => import('./pages/dashboard/dashboard').then(c => c.Dashboard) 
            },
            
            // Meus Jogos (Lista)
            { 
                path: 'meus-jogos', 
                loadComponent: () => import('./pages/game-list/game-list').then(c => c.GameList) 
            },
            
            // Formulários (Adicionar/Editar)
            { 
                path: 'adicionar-jogo', 
                loadComponent: () => import('./pages/game-form/game-form').then(c => c.GameForm) 
            },
            { 
                path: 'adicionar-jogo/:id', 
                loadComponent: () => import('./pages/game-form/game-form').then(c => c.GameForm) 
            },
            
            // Detalhes do Jogo
            { 
                path: 'game-details/:id', 
                loadComponent: () => import('./pages/game-details/game-details').then(c => c.GameDetails) 
            },
        ]
    },

    // 3. Rota Coringa (Redireciona qualquer rota não encontrada para o Login)
    { path: '**', redirectTo: 'login' } 
];