// src/app/pages/game-list/game-list.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor, *ngIf e async pipe
import { RouterModule } from '@angular/router'; // Para routerLink

// Imports do Material (Necessário para a listagem)
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Imports de Lógica (Com caminhos relativos CORRIGIDOS)
import { GameService } from '../../core/game.service';
import { GameStatus } from '../../models/game.model';
import { FilterByStatusPipe } from '../../shared/pipes/filter-by-status.pipe'; // O Pipe Standalone

@Component({
  selector: 'app-game-list',
  standalone: true,
  // ----------------------------------------------------
  // GARANTINDO QUE TODOS OS MÓDULOS ESTEJAM AQUI (STANDALONE)
  // ----------------------------------------------------
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    MatProgressBarModule,
    FilterByStatusPipe // Importa o Pipe Standalone
  ],
  templateUrl: './game-list.html',
  styleUrls: ['./game-list.scss']
})
export class GameListComponent {
  
  // O Observable de jogos (usamos o pipe async no template)
  games$ = this.gameService.games$;

  // Status para navegação por abas
  statuses: GameStatus[] = ['Playing', 'To Play', 'Played'];

  // O GameService é injetado no construtor (providedIn: 'root')
  constructor(private gameService: GameService) { }
}