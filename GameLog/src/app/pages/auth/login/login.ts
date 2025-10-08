// src/app/pages/auth/login/login.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

// Imports de Material
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const AUTH_TOKEN_KEY = 'auth_token'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './login.html', // <-- Garantimos que o nome do template é o mesmo
  styleUrls: ['./login.scss']
})
export class Login implements OnInit { // <-- Classe principal

  loginForm!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // 1. Simulação de sucesso de login
      const fakeToken = 'Auth_Token_OK'; 
      localStorage.setItem(AUTH_TOKEN_KEY, fakeToken); 
      
      // 2. Redireciona para a rota protegida principal
      this.router.navigate(['/app/dashboard']); 
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}