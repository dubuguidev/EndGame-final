// src/app/app.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { Header } from './shared/header/header'; // O nome do seu Header
import { CommonModule } from '@angular/common'; // Para o *ngIf
import { AuthService } from './core/auth.service'; // Para saber o estado do login
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 🚨 ATUALIZAÇÃO: Incluir o HeaderComponent e o CommonModule
  imports: [RouterOutlet, Header, CommonModule], 
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  
  // Variável para rastrear o estado de login
  isLoggedIn$: Observable<boolean>; 

  constructor(private authService: AuthService) {
    // Observa o estado de login para decidir se mostra o Header
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}