import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// CORREÇÃO DOS CAMINHOS RELATIVOS
import { GameService } from '../../core/game.service';
import { Game, GameStatus } from '../../models/game.model';

interface Stats {
  total: number;
  playing: number;
  toPlay: number;
  played: number;
  totalHours: number;
}

@Component({
  selector: 'app-dashboard', 
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})

export class Dashboard { 
  
  // Observable que mapeia a lista de jogos para as estatísticas
  stats$: Observable<Stats>;

  constructor(private gameService: GameService) {
    this.stats$ = this.gameService.games$.pipe(
      map(games => this.calculateStats(games as Game[]))
    );
  }

  private calculateStats(games: Game[]): Stats {
    const totalHours = games
      .map(g => g.hoursPlayed || 0)
      .reduce((sum, hours) => sum + hours, 0);

    return {
      total: games.length,
      playing: games.filter(g => g.status === 'Tô jogando').length,
      toPlay: games.filter(g => g.status === 'Quero jogar').length,
      played: games.filter(g => g.status === 'Terminado').length,
      totalHours: totalHours
    };
  }
}