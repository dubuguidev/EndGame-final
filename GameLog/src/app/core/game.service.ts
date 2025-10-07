// src/app/core/game.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game, GameStatus } from '../models/game.model'; // Importa o modelo Game

// Interface para as estatísticas
interface GameStats {
  total: number;
  playing: number;
  toPlay: number;
  played: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  // Lista de jogos UNIFICADA com caminhos corrigidos
  private gameList: Game[] = [
    {
      id: '1',
      title: 'Cyberpunk 2077',
      platform: 'PC',
      genre: 'Action RPG',
      status: 'Tô jogando' as GameStatus,
      progress: 30,
      hoursPlayed: 45,
      notes: 'Aventura distópica em Night City.',
      hoursToBeat: 60,
      // Caminho corrigido e verificado
      imageUrl: 'https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077UltimateEdition_CDPROJEKTRED_Editions_S1_2560x1440-b8bfbed19257188c717a26ee5bf79b41', 
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
      notes: 'Continuação brilhante do Breath of the wild.',
      hoursToBeat: 120,
      // Caminho corrigido e verificada a extensão (.jpg)
      imageUrl: 'https://zelda.nintendo.com/tears-of-the-kingdom/images/share-fb.jpg', 
    },
    {
      id: '3',
      title: 'The Witcher 3: Wild Hunt',
      platform: 'PC, PS4, Xbox One, Switch',
      genre: 'RPG de Ação',
      status: 'Quero jogar' as GameStatus,
      progress: 0,
      hoursPlayed: 0,
      notes: 'Um RPG de mundo aberto aclamado pela crítica com escolhas morais profundas.',
      hoursToBeat: 100,
      imageUrl: 'https://sm.ign.com/t/ign_br/video/t/the-first-/the-first-15-minutes-of-the-witcher-3-wild-hunt-ig_4bwz.1200.jpg',
    }
  ];

  // BehaviorSubject que gerencia o estado da lista de jogos
  private gamesSubject = new BehaviorSubject<Game[]>(this.gameList);
  
  // Observable público que os componentes consomem
  public games$: Observable<Game[]> = this.gamesSubject.asObservable();

  constructor() { }
  
  // ======================================================
  // MÉTODOS DE LEITURA (READ)
  // ======================================================

  getGames(): Observable<Game[]> {
    return this.games$;
  }

  // MÉTODO NECESSÁRIO PARA RESOLVER ERRO TS2339 (GameDetails/GameForm)
  getGameById(id: string): Game | undefined {
    return this.gameList.find(game => game.id === id);
  }
  
  // Método para obter as estatísticas do Dashboard
  getStats(): Observable<GameStats> {
    const games = this.gamesSubject.getValue();
    const stats = {
      total: games.length,
      playing: games.filter(g => g.status === 'Tô jogando').length,
      toPlay: games.filter(g => g.status === 'Quero jogar').length,
      played: games.filter(g => g.status === 'Terminado').length,
    };
    return new BehaviorSubject(stats).asObservable();
  }

  // ======================================================
  // MÉTODOS DE ESCRITA (CREATE, UPDATE, DELETE)
  // ======================================================

  // MÉTODO NECESSÁRIO PARA RESOLVER ERRO TS2339 (GameForm)
  saveGame(game: Game): void {
    const currentGames = this.gamesSubject.getValue();
    const existingIndex = currentGames.findIndex(g => g.id === game.id);

    if (existingIndex > -1) {
      // Atualizar
      currentGames[existingIndex] = game;
    } else {
      // Criar novo jogo
      game.id = game.id || Date.now().toString(); 
      currentGames.push(game);
    }
    this.gamesSubject.next(currentGames);
  }

  // MÉTODO NECESSÁRIO PARA RESOLVER ERRO TS2339 (GameDetails)
  deleteGame(id: string): void {
    let currentGames = this.gamesSubject.getValue();
    currentGames = currentGames.filter(game => game.id !== id);
    this.gamesSubject.next(currentGames);
  }
}