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

// 👇 INFORMAÇÕES DO LGPD 👇
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// Corrigido o caminho para o componente compartilhado que criamos
import { LgpdDialogComponent } from '../auth/login/lgpd/lgpd';

import { AuthService } from '../../core/auth.service'; // Ajustado o caminho para subir dois níveis

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatDialogModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register implements OnInit {

  registerForm!: FormGroup;
  isLoginMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog // <-- INJEÇÃO DO SERVIÇO DE DIALOG
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // Inicialização do formulário
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      lgpdAccepted: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;

      const success = this.authService.register(username, password);

      if (success) {
        alert('Conta criada! Faça login para continuar.');
        this.router.navigate(['/login']);
      } else {
        alert('Falha no cadastro. Usuário já pode existir ou as senhas não conferem.');
      }

    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  // 👇 NOVO MÉTODO PARA ABRIR O POP-UP 👇
  openLgpdDialog(): void {
    this.dialog.open(LgpdDialogComponent, {
      width: '600px',
      autoFocus: false
    });
  }
}