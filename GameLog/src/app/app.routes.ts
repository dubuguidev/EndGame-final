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
  loadComponent: () => import('./pages/dashboard/dashboard') // Sem .component
    .then(c => c.Dashboard), // Nome exato da classe
  title: 'GameLog - Dashboard'
  },
  // 2. Rota Principal para o Gerenciamento de Jogos
  {
  path: 'games',
    children: [
      {
        path: '', // /games
        // O caminho de importação deve apontar para o .ts (sem o .component)
        loadComponent: () => import('./pages/game-list/game-list') 
          // O nome da classe exportada no seu game-list.ts é GameList
          .then(c => c.GameList), 
        title: 'Meus Jogos'
      },
      {
        path: 'new', // /games/new
        loadComponent: () => import('./pages/game-form/game-form')
          .then(c => c.GameForm), // O nome da classe é GameForm
        title: 'Adicionar Jogo'
      },
      {
        path: 'edit/:id', // /games/edit/123
        loadComponent: () => import('./pages/game-form/game-form')
          .then(c => c.GameForm), // O nome da classe é GameForm
        title: 'Editar Jogo'
      },
      {
        path: ':id', // /games/123
        // IMPORTANDO APENAS O NOME DO ARQUIVO (.ts é opcional na importação)
        loadComponent: () => import('./pages/game-details/game-details') 
          // USANDO O NOME EXATO DA CLASSE QUE SEU ARQUIVO EXPORTA
          .then(c => c.GameDetails), 
        title: 'Detalhes do Jogo'
      },
    ]
},
  // Rota curinga para 404
  { path: '**', redirectTo: 'dashboard' }
];