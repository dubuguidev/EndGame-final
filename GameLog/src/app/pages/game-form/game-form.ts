// src/app/pages/game-form/game-form.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 

// IMPORTS DO ANGULAR MATERIAL 
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// IMPORTS DE LÓGICA
import { GameService } from '../../core/game.service';
import { Game, GameStatus } from '../../models/game.model';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    ReactiveFormsModule, 
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  templateUrl: './game-form.html',
  styleUrls: ['./game-form.scss']
})
export class GameForm implements OnInit {
  
  gameForm!: FormGroup;
  isEditMode = false;
  gameId: string | null = null;
  statusOptions: GameStatus[] = ['Playing', 'To Play', 'Played'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.gameId;

    this.initForm();

    if (this.isEditMode && this.gameId) {
      const gameToEdit = this.gameService.getGameById(this.gameId);
      if (gameToEdit) {
        this.gameForm.patchValue(gameToEdit);
      } else {
        this.router.navigate(['/games']); 
      }
    }
  }

  initForm(): void {
    this.gameForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      platform: ['', Validators.required],
      genre: ['', Validators.required],
      status: ['To Play', Validators.required],
      progress: [0, [Validators.min(0), Validators.max(100)]],
      hoursPlayed: [null],
      startDate: [null],
      finishDate: [null],
      rating: [null, [Validators.min(1), Validators.max(5)]],
      coverUrl: [null],
      notes: [null],
    });
  }

  onSubmit(): void {
    if (this.gameForm.valid) {
      const gameData: Game = this.gameForm.value;
      
      if (gameData.status === 'Played') {
        gameData.progress = 100;
      }
      
      this.gameService.saveGame(gameData);
      this.router.navigate(['/games']); 
    }
  }
}