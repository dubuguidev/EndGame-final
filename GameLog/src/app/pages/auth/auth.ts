// src/app/pages/auth/auth.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// IMPORTS REATIVOS ESSENCIAIS
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ReactiveFormsModule, // Necessário para [formGroup]
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule
  ],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'] 
})
export class Login implements OnInit { 
  
  authForm!: FormGroup; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder // Injeta FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  onSubmit(): void { 
    if (this.authForm.invalid) {
      alert('Por favor, preencha todos os campos e aceite os termos de uso.');
      return;
    }
    
    const { username, password } = this.authForm.value;
    
    // Chama o login
    const loginSuccessful = this.authService.login(username, password);

    if (loginSuccessful) {
      this.router.navigate(['/dashboard']); 
    } else {
      alert('Acesso negado. Credenciais inválidas ou usuário não cadastrado.');
    }
  }
  
  private createForm(): void {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      lgpdAccepted: [false, Validators.requiredTrue] 
    });
  }

  /**
   * MÉTODO ADICIONADO: Redireciona para a rota de cadastro.
   * Usado no template auth.html (agora com o link "Cadastre-se aqui").
   */
  goToRegister(): void {
    this.router.navigate(['/register']); 
  }
}