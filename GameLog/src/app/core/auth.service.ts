// src/app/core/auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Interface simples para o usuário, se não existir
interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Chave para armazenar o estado no Local Storage
  private AUTH_KEY = 'isAuthenticated';
  private USER_DB_KEY = 'userDatabase';

  // Gerencia o estado de login de forma reativa
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  // Armazenamento local simulado de usuários
  private userDatabase: User[] = [];

  constructor() {
    // 1. Inicializa o estado lendo do Local Storage
    const initialAuthStatus = localStorage.getItem(this.AUTH_KEY) === 'true';
    this.isLoggedInSubject = new BehaviorSubject<boolean>(initialAuthStatus);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
    
    // 2. Carrega o banco de dados de usuários do Local Storage
    const storedUsers = localStorage.getItem(this.USER_DB_KEY);
    if (storedUsers) {
      this.userDatabase = JSON.parse(storedUsers);
    }
  }

  // ======================================================
  // MÉTODO DE CADASTRO (Implementação do register.ts)
  // ======================================================

  register(username: string, password: string): boolean {
    // 1. Verifica se o usuário já existe
    if (this.userDatabase.find(u => u.username === username)) {
      console.error('Usuário já existe.');
      return false;
    }
    
    // 2. Adiciona o novo usuário
    const newUser: User = { username, password };
    this.userDatabase.push(newUser);
    
    // 3. Salva no Local Storage
    localStorage.setItem(this.USER_DB_KEY, JSON.stringify(this.userDatabase));
    
    console.log(`Usuário ${username} registrado com sucesso.`);
    return true;
  }
  
  // ======================================================
  // MÉTODO DE LOGIN (Implementação do auth.ts)
  // ======================================================

  login(username: string, password: string): boolean {
    // 1. Verifica as credenciais no banco de dados
    const user = this.userDatabase.find(u => u.username === username && u.password === password);

    if (user) {
      // 2. Define o estado de login como verdadeiro
      localStorage.setItem(this.AUTH_KEY, 'true');
      this.isLoggedInSubject.next(true); 
      console.log(`Login bem-sucedido para ${username}`);
      return true;
    } else {
      console.error('Credenciais inválidas ou usuário não encontrado.');
      return false;
    }
  }

  // ======================================================
  // MÉTODO DE LOGOUT
  // ======================================================

  logout(): void {
    // 1. Limpa o estado no Local Storage e no Subject
    localStorage.setItem(this.AUTH_KEY, 'false');
    this.isLoggedInSubject.next(false);
    
    // 2. Redireciona para a tela de login
    console.log('Logout realizado. Redirecionando para /login.');
  }

}