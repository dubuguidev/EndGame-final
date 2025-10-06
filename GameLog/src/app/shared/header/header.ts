// src/app/shared/header/header.ts

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/auth.service'; // Caminho de ../../core/auth.service

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header { // Usando o nome de classe 'Header'
  
  constructor(
    private authService: AuthService, 
    private router: Router          
  ) {}
  
  onLogout(): void {
    // 1. Desloga o usuário
    this.authService.logout();
    // 2. Redireciona para a tela de login
    this.router.navigate(['/login']);
  }
}