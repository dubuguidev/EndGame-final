// src/app/pages/dashboard/dashboard.ts

import { Component } from '@angular/core'; // Removido OnInit, pois não é estritamente necessário
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// CORREÇÃO DOS CAMINHOS RELATIVOS
import { GameService } from '../../core/game.service';
import { Game , GameStatus } from '../../models/game.model';

interface Stats {
  total: number;
  playing: number;
  toPlay: number;
  played: number;
  totalHours: number;
}

@Component({
  // Nota: Certifique-se que o seu seletor não inclui .component
  selector: 'app-dashboard', 
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.html', // Assumindo que o template é dashboard.html
  styleUrls: ['./dashboard.scss']
})
// USANDO O NOME EXATO DA SUA CLASSE
export class Dashboard { 
  
  // Observable que mapeia a lista de jogos para as estatísticas
  stats$: Observable<Stats> = this.gameService.games$.pipe(
    map(games => this.calculateStats(games))
  );

  constructor(private gameService: GameService) {}

  private calculateStats(games: Game[]): Stats {
    const totalHours = games
      .map(g => g.hoursPlayed || 0)
      .reduce((sum, hours) => sum + hours, 0);

    return {
      total: games.length,
      playing: games.filter(g => g.status === 'Playing').length,
      toPlay: games.filter(g => g.status === 'To Play').length,
      played: games.filter(g => g.status === 'Played').length,
      totalHours: totalHours
    };
  }
}