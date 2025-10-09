// src/app/app.ts (Componente Raiz)

import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router'; // Importar Router e ActivatedRoute
import { Header } from './shared/header/header'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from './core/auth.service'; 
import { Observable, filter, map } from 'rxjs'; // Importar filter e map para o router

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  
  isLoggedIn$: Observable<boolean>; 
  
  // 🚨 NOVO: Propriedade para controlar a visibilidade do Header
  shouldShowHeader = false; 

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  
  ngOnInit(): void {
    // 1. Monitora os eventos de navegação para saber a URL atual
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // 2. Verifica se a URL atual é a de login ou cadastro
      const currentUrl = event.urlAfterRedirects;
      
      // Define a flag: O Header deve aparecer se não for Login nem Register
      this.shouldShowHeader = !currentUrl.includes('/login') && !currentUrl.includes('/register');
    });
  }
}