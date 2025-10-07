// src/app/core/game-library.service.ts

import { Injectable } from '@angular/core';
// Importa seu modelo Game e GameStatus do local correto
import { Game, GameStatus } from '../models/game.model'; 

@Injectable({
  providedIn: 'root'
})
export class GameLibraryService {

  // Lista pré-definida de jogos (até 15)
  // TODOS os campos obrigatórios do seu modelo (title, platform, genre, status, progress, hoursToBeat, imageUrl) estão preenchidos.
  private readonly library: Game[] = [
    {
      id: '1',
      title: 'The Witcher 3: Wild Hunt',
      platform: 'PC, PS4, Xbox One, Switch',
      genre: 'RPG de Ação',
      status: 'Quero jogar' as GameStatus, // Usa o GameStatus que você definiu
      progress: 0, 
      hoursPlayed: 0,
      notes: 'Um RPG de mundo aberto aclamado pela crítica com escolhas morais profundas.',
      hoursToBeat: 100, // Campo novo para o carrossel
      coverUrl: '/assets/images/witcher3.jpg', 
      imageUrl: '/assets/images/witcher3_card.jpg' // O campo que será usado no carrossel
    },
    {
      id: '2',
      title: 'Cyberpunk 2077',
      platform: 'PC, PS5, Xbox Series X/S',
      genre: 'Action RPG',
      status: 'Tô jogando' as GameStatus,
      progress: 30,
      hoursPlayed: 45,
      notes: 'Aventura distópica e futurista na megalópole Night City.',
      hoursToBeat: 60,
      coverUrl: '/assets/images/cyberpunk.jpg',
      imageUrl: '/assets/images/cyberpunk_card.jpg'
    },
    {
      id: '3',
      title: 'Hollow Knight',
      platform: 'PC, Switch, PS4, Xbox One',
      genre: 'Metroidvania',
      status: 'Terminado' as GameStatus,
      progress: 100,
      hoursPlayed: 40,
      rating: 5,
      finishDate: new Date('2024-05-15'),
      notes: 'Um desafiador e belo Metroidvania com estilo de arte único.',
      hoursToBeat: 35,
      coverUrl: '/assets/images/hollowknight.jpg',
      imageUrl: '/assets/images/hollowknight_card.jpg'
    },
    // Adicione mais 12 jogos aqui para completar a sua biblioteca de 15...
    {
      id: '15',
      title: 'Placeholder Game',
      platform: 'Universal',
      genre: 'Indie',
      status: 'Quero jogar' as GameStatus,
      progress: 0,
      hoursPlayed: 0,
      notes: 'Jogo modelo para completar a biblioteca.',
      hoursToBeat: 15,
      coverUrl: '/assets/images/placeholder.jpg',
      imageUrl: '/assets/images/placeholder_card.jpg'
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