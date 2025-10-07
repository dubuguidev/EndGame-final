// src/app/core/header/header.ts

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 

// Módulos do Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Chave consistente para armazenamento do token
const AUTH_TOKEN_KEY = 'auth_token'; 

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
export class Header { // Mantendo o padrão de classe sem sufixo

  constructor(
    private router: Router,
  ) { }

  logout(): void {
    // ----------------------------------------------------
    // LÓGICA DE REMOÇÃO DO TOKEN
    // ----------------------------------------------------
    
    // 1. REMOVE O TOKEN DO LOCAL STORAGE (Encerra a persistência)
    localStorage.removeItem(AUTH_TOKEN_KEY); 
    
    console.log('Usuário deslogado! Redirecionando para login.');
    
    // 2. Redireciona para a página de login
    this.router.navigate(['/login']); 
  }
}