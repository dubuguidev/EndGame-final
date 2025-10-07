// src/app/app.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Importe explicitamente aqui
import { Header } from './shared/header/header';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Certifique-se que CommonModule está na lista:
    CommonModule,     // <--- ESSENCIAL! Resolve o erro 'async' (NG0302)
    RouterOutlet,
    Header
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'Gamelog';
  isLoggedIn$: Observable<boolean>; // Está sendo usado no template do header

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}