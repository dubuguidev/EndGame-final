// src/app/pages/game-library/game-library.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- ESSENCIAL PARA *ngFor e pipe slice
import { GameLibraryService } from '../../core/game-library.service';
import { Game } from '../../models/game.model'; // Seu modelo correto
// Importações do Angular Material
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-game-library',
  standalone: true,
  // NOVO: Adicione todos os módulos do Material usados no template
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule 
    // Se você estiver usando mat-icon para o botão, adicione MatIconModule
  ], 
  templateUrl: './game-library.html',
  styleUrl: './game-library.scss'
})
export class GameLibraryComponent implements OnInit {
  
  libraryGames: Game[] = [];
  
  constructor(private gameLibraryService: GameLibraryService) { }

  ngOnInit(): void {
    this.libraryGames = this.gameLibraryService.getGames();
  }

  addGameToUserList(gameId: string): void {
    // Lógica para adicionar o jogo
    console.log(`Jogo ${gameId} adicionado à lista do usuário.`);
  }
}