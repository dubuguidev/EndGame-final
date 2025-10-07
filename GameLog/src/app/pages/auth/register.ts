// src/app/pages/auth/register.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ReactiveFormsModule, 
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './register.html', // <--- Garanta que este arquivo existe!
  styleUrls: ['./auth.scss'] 
})
export class Register implements OnInit { 
  
  registerForm!: FormGroup; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
  }
  
  onSubmit(): void { 
    if (this.registerForm.invalid) {
      alert('Por favor, preencha o formulário corretamente.');
      return;
    }
    
    const { username, password } = this.registerForm.value;
    
    // Tenta registrar o usuário (o AuthService deve salvar no array/localStorage)
    const registrationSuccessful = this.authService.register(username, password);

    if (registrationSuccessful) {
      alert('Cadastro realizado com sucesso! Faça login agora.');
      this.router.navigate(['/login']); // Redireciona para o login
    } else {
      alert('Falha no cadastro. O usuário pode já estar cadastrado.');
    }
  }
  
  private createForm(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required] // Adicionado para demonstração
    });
  }

  /**
   * Método para voltar à tela de Login. 
   * Usado no template register.html.
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}