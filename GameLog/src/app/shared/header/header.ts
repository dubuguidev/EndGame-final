// src/app/shared/header/header.component.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Para as diretivas routerLink/routerLinkActive
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  // Importa os módulos do Material e do Router
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule], 
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button routerLink="/">
        <mat-icon>videogame_asset</mat-icon>
      </button>
      <span routerLink="/" style="cursor: pointer;">GameLog</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/dashboard" routerLinkActive="active">Dashboard</button>
      <button mat-button routerLink="/games" routerLinkActive="active">Meus Jogos</button>
      <button mat-raised-button color="accent" routerLink="/games/new">
        <mat-icon>add</mat-icon> Adicionar Jogo
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    /* Estilo simples para indicar a rota ativa */
    .active {
      border-bottom: 2px solid white; 
    }
  `]
})
export class HeaderComponent {
  // Nada de lógica aqui, é apenas navegação
}