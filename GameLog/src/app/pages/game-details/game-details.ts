// src/app/pages/game-details/game-details.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Imports do Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Imports de Lógica
import { GameService } from '../../core/game.service'; // Caminho relativo
import { Game } from '../../models/game.model'; // Caminho relativo

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  // Nota: Verifique o nome da classe exportada no seu arquivo! 
  // Se for 'GameDetalhes', você deve mudar a linha de exportação.
  templateUrl: './game-details.html', 
  styleUrls: ['./game-details.scss']
})
export class GameDetails implements OnInit { // <-- USANDO O NOME DA SUA CLASSE CORRIGIDA

  game: Game | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.game = this.gameService.getGameById(id);
        if (!this.game) {
          this.router.navigate(['/games']); // Volta se não encontrar
        }
      }
    });
  }
  
  onDelete(): void {
    if (confirm(`Tem certeza que deseja remover "${this.game?.title}" do seu GameLog?`)) {
      if (this.game?.id) {
        this.gameService.deleteGame(this.game.id);
        this.router.navigate(['/games']);
      }
    }
  }

  getPlatformIcon(platform: string): string {
    platform = platform.toLowerCase();
    if (platform.includes('pc')) return 'computer';
    if (platform.includes('xbox')) return 'xbox';
    if (platform.includes('switch')) return 'videogame_asset';
    if (platform.includes('ps') || platform.includes('playstation')) return 'sports_esports';
    return 'sports_esports';
  }
}