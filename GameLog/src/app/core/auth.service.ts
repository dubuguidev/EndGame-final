import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // O estado de login é um Observable que todos os componentes podem verificar
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  // Chave para persistência (Para lembrar o usuário após aceitar os termos)
  private AUTH_KEY = 'endgame_auth'; 

  constructor() {
    // Verifica o localStorage na inicialização para persistir o login
    const storedAuth = localStorage.getItem(this.AUTH_KEY);
    if (storedAuth === 'true') {
      this.loggedInSubject.next(true);
    }
  }

  login(): void {
    this.loggedInSubject.next(true);
    localStorage.setItem(this.AUTH_KEY, 'true');
  }

  logout(): void {
    this.loggedInSubject.next(false);
    localStorage.removeItem(this.AUTH_KEY);
  }

  get isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }
}