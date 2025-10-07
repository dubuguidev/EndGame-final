// src/app/pages/game-library/game-library.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

// Módulos do Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatChipsModule } from '@angular/material/chips'; 

import { Game } from '../../models/game.model';
import { GameService } from '../../core/game.service'; // Importa o serviço com a lista final

@Component({
  selector: 'app-game-library', 
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  // CORREÇÃO: Remove o './' para resolver o erro de caminho do VS Code
  templateUrl: 'game-library.html', 
  styleUrls: ['game-library.scss'] 
})
export class GameLibrary implements OnInit {
  
  libraryGames$!: Observable<Game[]>; 

  // Injeta o GameService, que agora tem a lista completa e corrigida.
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    // Obtém a lista de jogos do GameService (o unificado)
    this.libraryGames$ = this.gameService.getGames(); 
  }
  
  addGameToUserList(gameId: string): void {
      alert(`Jogo ID ${gameId} adicionado à sua lista!`);
  }
}