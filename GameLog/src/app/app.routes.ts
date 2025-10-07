// src/app/app.routes.ts (Completo e Corrigido)

import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard'; 

export const routes: Routes = [
    
    // 1. ROTAS NÃO PROTEGIDAS 
    
    // Rota Raiz: Redireciona para Login
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    
    // Rota de LOGIN (Aponta para o ÚNICO componente Auth: Register)
    { 
        path: 'login', 
        loadComponent: () => import('./pages/auth/register').then(c => c.Register),
        title: 'Login - EndGame'
    },
    
    // Rota de Cadastro (Aponta para o ÚNICO componente Auth: Register)
    { 
        path: 'register', 
        loadComponent: () => import('./pages/auth/register').then(c => c.Register),
        title: 'Cadastro - EndGame'
    },

    // 2. ROTA PROTEGIDA PRINCIPAL
    // Bloco que exige autenticação
    {
        path: 'app', // URL principal protegida: /app/dashboard
        canActivate: [authGuard], 
        children: [
            
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            
            // ... (Todas as rotas do aplicativo) ...
            { 
                path: 'dashboard', 
                loadComponent: () => import('./pages/dashboard/dashboard').then(c => c.Dashboard) 
            },
            
            { 
                path: 'meus-jogos', 
                loadComponent: () => import('./pages/game-list/game-list').then(c => c.GameList) 
            },
            // ... (game-form, game-details, etc.) ...
        ]
    },

    // Rota Coringa: Redireciona qualquer coisa não encontrada para o Login
    { path: '**', redirectTo: 'login' } 
];