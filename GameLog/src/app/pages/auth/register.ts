// src/app/auth/register/register.ts (Completo e Corrigido)

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { take } from 'rxjs'; // Importar take para encerrar a inscrição

// Módulos do Material
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

const AUTH_TOKEN_KEY = 'auth_token'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatCheckboxModule 
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
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    // 1. Usa take(1) para monitorar a rota apenas na inicialização (mais seguro)
    this.route.url.pipe(take(1)).subscribe(urlSegments => {
      // Verifica se a URL contém 'login' para definir o modo
      this.isLoginMode = urlSegments.some(segment => segment.path === 'login');
      this.initForm(); 
    });
  }

  initForm(): void {
    // 🚨 CORREÇÃO CRÍTICA: O formulário só deve ter os campos necessários para ser válido!
    if (this.isLoginMode) {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    } else {
        // Modo Cadastro (Register)
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });
    }
  }

  onSubmit(): void {
    // 🚨 Debugging: Verifica se a função está sendo chamada e se o formulário está válido
    console.log('Botão pressionado. Formulário válido?', this.registerForm.valid); 
    
    if (this.registerForm.valid) {
      console.log(`Submissão bem-sucedida em modo ${this.isLoginMode ? 'LOGIN' : 'CADASTRO'}`);
      
      const fakeToken = this.isLoginMode ? 'TOKEN_LOGIN_OK' : 'TOKEN_REGISTER_OK';
      localStorage.setItem(AUTH_TOKEN_KEY, fakeToken); 
      
      // Redireciona para o aplicativo, que agora tem a rota /app
      this.router.navigate(['/app/dashboard']); 
    } else {
        console.error('Formulário Inválido. Verifique os campos e o initForm.');
        // Opcional: Marca todos os campos como "touched" para mostrar erros
        this.registerForm.markAllAsTouched(); 
    }
  }
  
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}