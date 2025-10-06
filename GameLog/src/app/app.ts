// src/app/app.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header'; 
import { AuthService } from './core/auth.service'; // <--- IMPORT AQUI

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent], 
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'GameLog';
  
  // Expor o estado de login para o template
  isLoggedIn$ = this.authService.isLoggedIn$; // <--- PROPRIEDADE AQUI

  constructor(private authService: AuthService) {} // <--- INJEÇÃO AQUI
}