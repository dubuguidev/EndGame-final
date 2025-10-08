// src/app/pages/auth/register/register.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; 
import { CommonModule } from '@angular/common';

// Imports de Material
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AuthService } from '../../core/auth.service'; // Serviço que contém o método register()

const AUTH_TOKEN_KEY = 'auth_token'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule, 
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule
  ],
  templateUrl: './register.html', // Template que acabamos de criar
  styleUrls: ['./register.scss'] 
})
export class Register implements OnInit {

  registerForm!: FormGroup; 
  isLoginMode: boolean = false; // Manter como 'false' se for apenas Cadastro

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService // Injetamos o AuthService
  ) { 
    this.initForm(); 
  }

  ngOnInit(): void {
    // Inicialização do formulário
  }

  initForm(): void {
    // 🚨 Configuração COMPLETA e CORRETA para CADASTRO
    this.registerForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        lgpdAccepted: [false, Validators.requiredTrue] // A LGPD deve ser true
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
        const { username, password } = this.registerForm.value;
        
        // 1. Chama o método de cadastro (implementado no AuthService)
        const success = this.authService.register(username, password);

        if (success) {
            alert('Conta criada! Faça login para continuar.');
            this.router.navigate(['/login']); // Redireciona para o login
        } else {
            alert('Falha no cadastro. Usuário já pode existir ou as senhas não conferem.');
        }

    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
  
  // Método para alternar para Login (usado no rodapé do HTML)
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}