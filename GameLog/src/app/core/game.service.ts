// src/app/core/game.service.ts

import { Injectable } from '@angular/core';
import { Game, GameStatus } from '../models/game.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
    // Lista de jogos (Estado interno)
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
            hoursToBeat: 120,
            imageUrl: '/assets/images/zelda_totk.jpg', 
        },
        // ... (Seus demais jogos) ...
    ];

    private gamesSubject = new BehaviorSubject<Game[]>(this.gameList);
    games$: Observable<Game[]> = this.gamesSubject.asObservable();

    constructor() { }

    // ======================================================
    // MÉTODOS DE CONSULTA (Resolve 'getGameById' - TS2339)
    // ======================================================

    /**
     * Retorna um jogo pelo seu ID (usado por game-details.ts e game-form.ts)
     */
    getGameById(id: string): Game | undefined {
        return this.gameList.find(game => game.id === id);
    }
    
    // ======================================================
    // MÉTODOS DE MANIPULAÇÃO (CRUD)
    // ======================================================

    /**
     * Adiciona um novo jogo ou atualiza um existente (usado por game-form.ts)
     * Resolve 'saveGame' (TS2339)
     */
    saveGame(game: Game): void {
        const index = this.gameList.findIndex(g => g.id === game.id);

        if (index > -1) {
            // Atualizar jogo existente (Editar)
            this.gameList[index] = game;
            console.log(`Jogo atualizado: ${game.title}`);
        } else {
            // Adicionar novo jogo (Criar)
            // Simula a criação de um ID único (em um backend real, seria gerado lá)
            game.id = Date.now().toString(); 
            this.gameList.push(game);
            console.log(`Novo jogo adicionado: ${game.title}`);
        }
        
        // Emite a nova lista para quem estiver observando (game-list, dashboard)
        this.gamesSubject.next(this.gameList);
    }

    /**
     * Remove um jogo da lista (usado por game-details.ts)
     * Resolve 'deleteGame' (TS2339)
     */
    deleteGame(id: string): void {
        const initialLength = this.gameList.length;
        this.gameList = this.gameList.filter(game => game.id !== id);
        
        if (this.gameList.length < initialLength) {
            console.log(`Jogo com ID ${id} removido.`);
            // Emite a nova lista
            this.gamesSubject.next(this.gameList);
        } else {
            console.error(`Erro: Jogo com ID ${id} não encontrado para exclusão.`);
        }
    }
}