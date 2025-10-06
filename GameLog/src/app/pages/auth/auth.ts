// src/app/pages/auth/auth.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

// Imports do Material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox'; 

// AuthService (Vamos criar este Serviço no próximo passo)
import { AuthService } from '../../core/auth.service'; // Caminho relativo

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss']
})
export class Auth implements OnInit { // Usando o nome de classe 'Auth'
  
  authForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      // Campo crucial: LGPD (deve ser true)
      lgpdAccepted: [false, Validators.requiredTrue] 
    });
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      // Simulação de login
      this.authService.login();
      this.router.navigate(['/dashboard']); 
    } else {
      alert('Preencha todos os campos e aceite os termos da LGPD para continuar.');
    }
  }
}