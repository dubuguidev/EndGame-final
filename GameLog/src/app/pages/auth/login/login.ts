// src/app/pages/auth/login/login.ts (Completo)

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

// Módulos do Material
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Necessário para o 'Lembre-se de mim'

const AUTH_TOKEN_KEY = 'auth_token'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule
  ],
  templateUrl: './login.html', 
  styleUrls: ['./login.scss']
})
export class Login implements OnInit { 

  loginForm!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Configuração do formulário de LOGIN
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email ou nome de usuário
      password: ['', Validators.required],
      rememberMe: [false] // Para o checkbox
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Simulação de sucesso de login
      const fakeToken = 'Auth_Token_OK'; 
      localStorage.setItem(AUTH_TOKEN_KEY, fakeToken); 
      
      // Redireciona para a rota protegida principal
      this.router.navigate(['/app/dashboard']); 
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}