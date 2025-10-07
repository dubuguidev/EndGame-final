// src/app/core/game-library.service.ts

import { Injectable } from '@angular/core';
import { Game, GameStatus } from '../models/game.model'; // Importando seu modelo

@Injectable({
  providedIn: 'root'
})
export class GameLibraryService {

  // Lista pré-definida de jogos (com campos obrigatórios preenchidos)
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
      imageUrl: '/assets/images/witcher3_card.jpg' 
    },
    {
      id: '2',
      title: 'The Legend of Zelda: TOTK',
      platform: 'Switch',
      genre: 'Aventura',
      status: 'Terminado' as GameStatus,
      progress: 100,
      hoursPlayed: 150,
      rating: 5,
      finishDate: new Date('2024-05-15'),
      notes: 'Continuação brilhante do Breath of the Wild.',
      hoursToBeat: 120,
      coverUrl: '/assets/images/zelda_totk.jpg',
      imageUrl: '/assets/images/zelda_totk_card.jpg'
    },
    {
      id: '3',
      title: 'Elden Ring',
      platform: 'PS5, Xbox Series X/S, PC',
      genre: 'Souls-like',
      status: 'Tô jogando' as GameStatus,
      progress: 65,
      hoursPlayed: 85,
      notes: 'Vasto mundo aberto com a dificuldade Souls característica.',
      hoursToBeat: 80,
      coverUrl: '/assets/images/elden_ring.jpg',
      imageUrl: '/assets/images/elden_ring_card.jpg'
    },
    // Adicione mais jogos aqui (total de 15)
    // ...
    {
      id: '15',
      title: 'Final Fantasy XIV',
      platform: 'PC, PS5',
      genre: 'MMORPG',
      status: 'Quero jogar' as GameStatus,
      progress: 0,
      hoursPlayed: 0,
      notes: 'Um dos melhores MMORPGs da atualidade.',
      hoursToBeat: 300, 
      coverUrl: '/assets/images/ffxiv.jpg',
      imageUrl: '/assets/images/ffxiv_card.jpg'
    }
  ];

  constructor() { }

  /**
   * Retorna a lista completa de jogos pré-definidos para o carrossel.
   */
  getGames(): Game[] {
    return this.library;
  }
}