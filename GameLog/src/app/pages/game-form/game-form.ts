import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; // Removido imports não usados
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Imports do Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { TextFieldModule } from '@angular/cdk/text-field'; // <-- IMPORTANTE para o textarea auto-ajustável

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
    TextFieldModule // <-- Adicionar aqui
  ],
  templateUrl: './game-form.html',
  styleUrls: ['./game-form.scss']
})
export class GameFormComponent implements OnInit {
  gameForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
    // Adicione seus serviços aqui (ex: GameService)
  ) {}

  ngOnInit(): void {
    this.gameForm = this.fb.group({
      title: [''],
      platform: [''],
      genre: [''],
      status: [''],
      coverUrl: [''],
      progress: [0],
      notes: [''] // <-- NOVO CAMPO ADICIONADO AQUI
    });
  }

  onSubmit(): void {
    // Sua lógica para salvar
    console.log(this.gameForm.value);
  }

  onCancel(): void {
    // Sua lógica para cancelar
    this.router.navigate(['/games']);
  }
}