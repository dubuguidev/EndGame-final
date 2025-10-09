import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa o Router
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider'; 
import { MatIconModule } from '@angular/material/icon'; 

import { GameService } from '../../core/game.service'; // Ajuste o caminho conforme sua estrutura
import { Game } from '../../models/game.model'; // Ajuste o caminho conforme sua estrutura


@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatSliderModule, 
    MatIconModule
  ],
  templateUrl: './game-form.html',
  styleUrls: ['./game-form.scss']
})
export class GameForm implements OnInit { // <-- Classe sem o sufixo 'Component'

  gameForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router // Injeção do Router para navegação
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    //   if (id) { this.loadGameForEdit(id); 
  }

  private initForm(): void {
    this.gameForm = this.fb.group({
      id: [null], // Campo oculto para ID (necessário para salvar/editar)
      title: ['', Validators.required],
      platform: ['', Validators.required],
      genre: [''],
      status: ['Quero jogar', Validators.required],
      progress: [0, Validators.min(0)],
      hoursPlayed: [0, Validators.min(0)],
      rating: [null],
      hoursToBeat: [null],
      notes: [''],
      imageUrl: [''], // Campo adicionado no HTML
    });
  }

  onSubmit(): void {
    if (this.gameForm.valid) {
      const game: Game = this.gameForm.value;
      this.gameService.saveGame(game);
      
      this.router.navigate(['/meus-jogos']); 
    }
  }

  onCancel(): void {
    this.router.navigate(['/meus-jogos']); 
  }
}