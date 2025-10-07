import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
// Adicione Observable aqui se ainda não tiver
import { Observable } from 'rxjs'; 

// Imports do Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// IMPORTS DE LÓGICA (CAMINHOS RELATIVOS CORRIGIDOS)
import { GameService } from '../../core/game.service';
import { GameStatus, Game } from '../../models/game.model'; // Adicione Game
import { FilterByStatusPipe } from '../../shared/pipes/filter-by-status-pipe'; 

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    MatProgressBarModule,
    FilterByStatusPipe 
  ],
  templateUrl: './game-list.html', 
  styleUrls: ['./game-list.scss']
})
export class GameList { 
  
  // Certifique-se que o tipo seja Observable<Game[]>.
  games$: Observable<Game[]>;

  // Status para navegação por abas
  statuses: GameStatus[] = ['Terminado' , 'Tô jogando' , 'Quero jogar'];

  // O GameService é injetado.
  constructor(private gameService: GameService) {
    this.games$ = this.gameService.games$;
  }
}