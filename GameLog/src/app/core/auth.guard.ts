// src/app/core/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Certifique-se de que o caminho está correto

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Observa o estado de login do AuthService
    return this.authService.isLoggedIn$.pipe(
      // Pega o valor atual e completa o Observable (essencial para guards)
      take(1),
      
      // Mapeia o estado de login para a permissão de rota
      map(isLoggedIn => {
        // CORREÇÃO DO ERRO TS2551: Usando 'isLoggedIn$' corretamente
        if (isLoggedIn) {
          // Permite o acesso à rota
          return true;
        } else {
          // Redireciona para a página de login e retorna uma UrlTree
          // Presumindo que sua rota de login seja '/auth/login'
          return this.router.createUrlTree(['/auth/login']); 
        }
      })
    );
  }
}