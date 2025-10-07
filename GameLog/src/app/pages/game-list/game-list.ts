// src/app/pages/game-list/game-list.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Observable, map } from 'rxjs';

// Módulos do Material (NECESSÁRIO para resolver NG8001 e erros de componente)
import { CommonModule } from '@angular/common'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Game } from '../../models/game.model';
import { GameService } from '../../core/game.service';


@Component({
  selector: 'app-game-list',
  standalone: true,
  // IMPORTAR TODOS OS MÓDULOS USADOS NO TEMPLATE
  imports: [
    CommonModule, 
    MatTabsModule, 
    MatProgressBarModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './game-list.html', 
  styleUrls: ['./game-list.scss']
})
export class GameList implements OnInit { // <-- CLASSE GameList (corrigindo TS2339 e erro de rota)

  finishedGames$!: Observable<Game[]>;
  playingGames$!: Observable<Game[]>;
  toPlayGames$!: Observable<Game[]>;

  constructor(
    private gameService: GameService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    const allGames$ = this.gameService.games$;

    // Filtros de jogos para cada aba
    this.finishedGames$ = allGames$.pipe(
      map(games => games.filter(g => g.status === 'Terminado'))
    );
    this.playingGames$ = allGames$.pipe(
      map(games => games.filter(g => g.status === 'Tô jogando'))
    );
    this.toPlayGames$ = allGames$.pipe(
      map(games => games.filter(g => g.status === 'Quero jogar'))
    );
  }

  // Métodos de Ação (corrigindo 'viewDetails' e 'editGame' no HTML)
  viewDetails(gameId: string): void {
    this.router.navigate(['/game-details', gameId]);
  }

  editGame(gameId: string): void {
    this.router.navigate(['/adicionar-jogo', gameId]);
  }
}