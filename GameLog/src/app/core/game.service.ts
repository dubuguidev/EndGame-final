// src/app/core/game.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games: Game[] = [
    // Dados iniciais de exemplo
    { id: '1', title: 'Cyberpunk 2077', platform: 'PC', genre: 'RPG', status: 'Playing', progress: 45, hoursPlayed: 80 },
    { id: '2', title: 'The Legend of Zelda: TOTK', platform: 'Switch', genre: 'Adventure', status: 'Played', progress: 100, rating: 5 },
    { id: '3', title: 'Elden Ring', platform: 'PS5', genre: 'Soulslike', status: 'To Play', progress: 0 },
  ];

  private gamesSubject = new BehaviorSubject<Game[]>(this.games);

  getGames(): Observable<Game[]> {
    return this.gamesSubject.asObservable();
  }

  getGameById(id: string): Game | undefined {
    return this.games.find(g => g.id === id);
  }

  saveGame(game: Game): void {
    if (game.id) {
      // Edição
      const index = this.games.findIndex(g => g.id === game.id);
      if (index > -1) {
        this.games[index] = game;
      }
    } else {
      // Novo Cadastro
      const newGame: Game = { ...game, id: Date.now().toString() };
      this.games.push(newGame);
    }
    this.gamesSubject.next(this.games); // Atualiza o Subject para notificar os componentes
  }

  deleteGame(id: string): void {
    this.games = this.games.filter(g => g.id !== id);
    this.gamesSubject.next(this.games);
  }
}