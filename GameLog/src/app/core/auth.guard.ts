// src/app/auth/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// A CHAVE DEVE SER EXATAMENTE IGUAL EM TODOS OS LUGARES
const AUTH_TOKEN_KEY = 'auth_token'; 

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // 1. Verifica se o token existe no localStorage.
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    // 2. Se o token existir, permite o acesso.
    return true;
  } else {
    // 3. Se não existir, redireciona para a tela de login.
    console.log('AuthGuard: Acesso bloqueado. Redirecionando para /login');
    router.navigate(['/login']);
    return false;
  }
};