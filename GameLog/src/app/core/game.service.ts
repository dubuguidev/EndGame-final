import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game, GameStatus } from '../models/game.model';

// Interface para as estatísticas (se você estiver usando no dashboard)
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
  
  // Lista de jogos UNIFICADA com caminhos corrigidos (assets/images/)
  private gameList: Game[] = [
    {
      id: '1',
      title: 'The Last of Us - Part I',
      platform: 'PC & PlayStation',
      genre: 'Sobrevivência pós-apocalíptica',
      status: 'Tô jogando' as GameStatus,
      progress: 30,
      hoursPlayed: 12,
      notes: 'É um drama pós-apocalíptico ambientado 20 anos após uma pandemia de fungos transformar a humanidade em criaturas agressivas.',
      hoursToBeat: 26,
      imageUrl: 'https://wallpapers.com/images/featured/fundo-de-the-last-of-us-r7fj6mkk8hckyi2m.jpg', 
    },
    {
      id: '2',
      title: 'The Last of Us Part II',
      platform: 'PC & PlayStation',
      genre: 'Sobrevivência pós-apocalíptica',
      status: 'Terminado' as GameStatus,
      progress: 100,
      hoursPlayed: 43,
      rating: 5,
      notes: 'Ellie vive em uma comunidade próspera, mas um evento trágico a leva a uma jornada violenta de vingança contra aqueles que a prejudicaram.',
      hoursToBeat: 43,
      imageUrl: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2619/gRnScYA4PLovtrbWGya54xnx.jpg', 
    },
    {
      id: '3',
      title: 'Stardew Valley',
      platform: 'PC, PlayStation & Mobile',
      genre: 'Simulação Multiplayer',
      status: 'Quero jogar' as GameStatus,
      progress: 0,
      hoursPlayed: 0,
      notes: 'O jogador herda uma fazenda antiga e decadente de seu avô em Pelican Town, com o objetivo de restaurá-la e transformá-la em um próspero lar.',
      hoursToBeat: 100,
      imageUrl: 'https://s2-techtudo.glbimg.com/DtNdeIWqweKjcOYF6igIqNmo3zE=/600x0/filters:quality(50)/https://i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2024/B/R/oLklBvTNWJmRJGv9drVg/captura-de-tela-2024-04-03-104520.png',
    },
    {
      id: '4',
      title: 'God of War Ragnarök',
      platform: 'PC & PS5',
      genre: 'RPG de Ação',
      status: 'Quero jogar' as GameStatus,
      progress: 0,
      hoursPlayed: 0,
      notes: 'Um jogo de ação e aventura no qual Kratos e seu filho Atreus viajam pelos Nove Reinos para evitar o Ragnarök.',
      hoursToBeat: 70,
      imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1117/4uH3OH4dQtHMe2gmdFuth02u.jpg',
    },
    {
      id: '5',
      title: 'Red Dead Redemption 2',
      platform: 'PC & PlayStation',
      genre: 'Ação e aventura em um mundo aberto com temática de faroeste. ',
      status: 'Quero jogar' as GameStatus,
      progress: 0,
      hoursPlayed: 0,
      notes: 'Em 1899, nos Estados Unidos, Arthur Morgan e a gangue de foras da lei Van der Linde são forçados a fugir após um assalto que deu errado em Blackwater, tendo que lutar para sobreviver enquanto são caçados por agentes federais e caçadores de recompensas.',
      hoursToBeat: 30,
      imageUrl: 'https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg',
    },
    {
      id: '6',
      title: "Assassin's Creed Shadows",
      platform: 'PC, PlayStation, Microsoft & Switch',
      genre: 'Mundo Aberto',
      status: 'Quero jogar' as GameStatus,
      progress: 0,
      hoursPlayed: 0,
      notes: 'A história se passa no Japão feudal, no final do período Sengoku, onde os jogadores vivenciam a saga de dois protagonistas distintos: Naoe, uma ninja habilidosa vingativa, e Yasuke, um samuraio africano poderoso e lendário.',
      hoursToBeat: 100,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKg6Os3SG0h69-mBSenILlmRPsvzgJhFjfcw&s',
    },
    {
      id: '7',
      title: 'The Witcher 3: Wild Hunt',
      platform: 'PC, PlayStation, Microsoft & Switch',
      genre: 'RPG de Ação',
      status: 'Quero jogar' as GameStatus,
      progress: 0,
      hoursPlayed: 0,
      notes: 'Um RPG de mundo aberto aclamado pela crítica com escolhas morais profundas.',
      hoursToBeat: 100,
      imageUrl: 'https://sm.ign.com/t/ign_br/video/t/the-first-/the-first-15-minutes-of-the-witcher-3-wild-hunt-ig_4bwz.1200.jpg',
    },
    {
      id: '8',
      title: 'The Legend of Zelda: TOTK',
      platform: 'PC, PlayStation, Microsoft & Switch',
      genre: 'Aventura',
      status: 'Terminado' as GameStatus,
      progress: 100,
      hoursPlayed: 150,
      rating: 5,
      notes: 'Continuação brilhante do Breath of the wild.',
      hoursToBeat: 120,
      imageUrl: 'https://zelda.nintendo.com/tears-of-the-kingdom/images/share-fb.jpg', 
    },
    {
    id: '9',
      title: 'Cyberpunk 2077',
      platform: 'PC & Playstation',
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
      id: '10',
      title: 'Doom: The Dark Ages',
      platform: 'PC, PlayStation, Microsoft & Switch',
      genre: 'Tiro em primeira pessoa',
      status: 'Quero jogar' as GameStatus,
      progress: 0,
      hoursPlayed: 0,
      notes: 'É uma prequel que mostra as origens do DOOM Slayer, o "superarma" de reis e deuses, em um passado medieval sombrio.',
      hoursToBeat: 30,
      imageUrl: 'https://images.mweb.bethesda.net/_images/doom-the-dark-ages/doom-tda-premium-banner.webp?f=jpg&h=1030&w=1858&s=RUEHO3D3bUaIF88RAvCBhkU75xNd6nnDXHv5TaiDOAw',
    },
  ];

   private gamesSubject = new BehaviorSubject<Game[]>(this.gameList);
  public games$: Observable<Game[]> = this.gamesSubject.asObservable();

  constructor() { }
  
  getGames(): Observable<Game[]> {
    return this.games$;
  }

  getGameById(id: string): Game | undefined {
    return this.gameList.find(game => game.id === id);
  }
  
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

  saveGame(game: Game): void {
    const currentGames = this.gamesSubject.getValue();
    const existingIndex = currentGames.findIndex(g => g.id === game.id);

    if (existingIndex > -1) {
      currentGames[existingIndex] = game;
    } else {
      game.id = Date.now().toString(); 
      currentGames.push(game);
    }
    this.gamesSubject.next([...currentGames]);
  }

  deleteGame(id: string): void {
    let currentGames = this.gamesSubject.getValue();
    currentGames = currentGames.filter(game => game.id !== id);
    this.gamesSubject.next([...currentGames]);
  }
}