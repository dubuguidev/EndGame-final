// src/app/pages/dashboard/dashboard.ts (Corrigido para usar o GameService)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { GameLibrary } from '../game-library/game-library'; // OK
import { GameService } from '../../core/game.service'; 
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Necessário para os ícones

// Interface para as estatísticas
interface GameStats {
  total: number;
  playing: number;
  toPlay: number;
  played: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    GameLibrary, // Módulo do Carrossel
    MatCardModule, // Módulos para as estatísticas
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  
  stats$!: Observable<GameStats>; 

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    // Implemente o método de estatísticas no GameService e chame ele aqui
    // Se você não tiver um método 'getStats()', a linha abaixo pode ser comentada
    // this.stats$ = this.gameService.getStats(); 
  }
}