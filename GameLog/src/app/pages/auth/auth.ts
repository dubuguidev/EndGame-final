// src/app/pages/auth/auth.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 

// Angular Material Imports (necessários para o template auth.html)
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
    ReactiveFormsModule, 
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule
  ],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'] 
})
// O seu app.routes.ts está chamando c.Login, então esta classe deve ser 'Login'.
export class Login implements OnInit { 
  
  authForm!: FormGroup; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder // Injeta FormBuilder para criar o formulário
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  onSubmit(): void { 
    if (this.authForm.invalid) {
      alert('Preencha todos os campos e aceite os termos de uso.');
      return;
    }
    
    const { username, password } = this.authForm.value;
    
    // Resolve o erro TS2554 (login() precisa de 2 argumentos)
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

  goToRegister(): void {
    this.router.navigate(['/register']); // Mapeado para a nova rota de cadastro
  }
}