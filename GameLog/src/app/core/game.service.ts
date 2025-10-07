// src/app/core/game.service.ts

import { Injectable } from '@angular/core';
import { Game, GameStatus } from '../models/game.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
    // Simulação da lista de jogos do usuário
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
            coverUrl: '/assets/images/cyberpunk_cover.jpg',
            // CAMPOS OBRIGATÓRIOS ADICIONADOS:
            hoursToBeat: 60,
            imageUrl: '/assets/images/cyberpunk.jpg', 
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
            notes: 'Continuação brilhante do Breath of the Wild.',
            coverUrl: '/assets/images/zelda_totk_cover.jpg',
            // CAMPOS OBRIGATÓRIOS ADICIONADOS:
            hoursToBeat: 120,
            imageUrl: '/assets/images/zelda_totk.jpg', 
        },
        {
            id: '3', 
            title: 'Elden Ring',
            platform: 'PS5',
            genre: 'Souls-like',
            status: 'Quero jogar' as GameStatus, 
            progress: 0, 
            hoursPlayed: 0,
            notes: 'Vasto mundo aberto com a dificuldade Souls característica.',
            coverUrl: '/assets/images/elden_ring_cover.jpg',
            // CAMPOS OBRIGATÓRIOS ADICIONADOS:
            hoursToBeat: 80,
            imageUrl: '/assets/images/elden_ring.jpg', 
        },
        // Adicione seus 15 jogos completos aqui...
    ];

    private gamesSubject = new BehaviorSubject<Game[]>(this.gameList);
    games$: Observable<Game[]> = this.gamesSubject.asObservable();

    constructor() { }
    
    // Futuros métodos de gerenciamento de jogos...
}