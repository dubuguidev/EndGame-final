// src/app/core/game-library.service.ts

import { Injectable } from '@angular/core';
import { Game, GameStatus } from '../models/game.model'; // Importando o modelo Game

@Injectable({
  providedIn: 'root'
})
export class GameLibraryService {

  // Esta lista é mantida como a original (para não quebrar dependências)
  private readonly library: Game[] = [
    {
      id: '1',
      title: 'The Witcher 3: Wild Hunt',
      platform: 'PC, PS4, Xbox One, Switch',
      genre: 'RPG de Ação',
      status: 'Quero jogar' as GameStatus,
      progress: 0,
      hoursPlayed: 0,
      notes: 'Um RPG de mundo aberto aclamado pela crítica com escolhas morais profundas.',
      hoursToBeat: 100,
      coverUrl: '/assets/images/witcher3.jpg', 
      imageUrl: '/assets/images/witcher3_card.jpg',
    },
    {
      id: '2', 
      title: 'The Legend of Zelda: TOTK',
      platform: 'Switch',
      genre: 'Aventura',
      status: 'Terminado' as GameStatus,
      progress: 150,
      hoursPlayed: 150,
      rating: 5,
      notes: 'Continuação brilhante do Breath of the wild.',
      hoursToBeat: 120,
      coverUrl: '/assets/images/zelda_totk.jpg',
      imageUrl: '/assets/images/zelda_totk_card.jpg',
    },
    
    // ... outros jogos originais aqui
  ];

  constructor() { }

  getLibraryGames(): Game[] {
    return this.library;
  }
}