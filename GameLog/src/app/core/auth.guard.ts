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
    
    // CORREÇÃO: Usando isLoggedIn$ corretamente (resolve TS2551 se o erro persistir)
    return this.authService.isLoggedIn$.pipe(
      take(1),
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true; // Usuário logado: permite acesso.
        } else {
          // Usuário NÃO logado: redireciona para a rota de login
          return this.router.createUrlTree(['/login']); 
        }
      })
    );
  }
}