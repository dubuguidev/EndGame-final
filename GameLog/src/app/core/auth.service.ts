// src/app/core/auth.service.ts

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'; // Necessário para a propriedade isLoggedIn$

// Interface para definir a estrutura de um usuário
interface UserCredentials {
  username: string;
  passwordHash: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // 1. Simula um "banco de dados" local para usuários cadastrados
  // NOTA: Em produção, isto viria de um Backend e usaria hashes de senha.
  private users: UserCredentials[] = [];
  
  // 2. Controla o estado de login para que o header (app.component.ts) possa reagir
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  
  constructor() { 
    // Garante que o estado inicial do Subject reflita o localStorage
    // Caso o usuário recarregue a página
    this.isLoggedInSubject.next(this.hasToken());
  }
  
  // ----------------------------------------------------
  // MÉTODOS DE AUTENTICAÇÃO
  // ----------------------------------------------------

  /**
   * Verifica se as credenciais já existem e cadastra o novo usuário.
   */
  register(username: string, password: string): boolean {
    // 1. Verifica se o usuário já existe
    if (this.users.find(u => u.username === username)) {
      console.error('ERRO: Usuário já cadastrado!');
      return false;
    }
    
    // 2. Cadastra o novo usuário (Simulação)
    this.users.push({ username, passwordHash: password });
    console.log(`Usuário registrado: ${username}. Total de usuários: ${this.users.length}`);
    return true;
  }

  /**
   * Tenta fazer login, verificando se o usuário existe na lista e se a senha confere.
   */
  login(username: string, password: string): boolean {
    // 1. Busca o usuário cadastrado com o username e senha
    const user = this.users.find(
      u => u.username === username && u.passwordHash === password
    );
    
    if (user) {
      // 2. Login Bem-sucedido: Armazena o token e atualiza o estado
      localStorage.setItem('isAuthenticated', 'true');
      this.isLoggedInSubject.next(true);
      console.log('Login bem-sucedido!');
      return true;
    } else {
      // 3. Login Falhou: Credenciais não encontradas ou incorretas
      console.error('ERRO: Credenciais inválidas ou usuário não cadastrado.');
      return false;
    }
  }

  /**
   * Realiza o logout e limpa o status.
   */
  logout(): void {
    localStorage.removeItem('isAuthenticated');
    this.isLoggedInSubject.next(false);
    console.log('Logout realizado.');
    // Você deve adicionar aqui a navegação para a página de login.
  }

  /**
   * Função auxiliar para verificar o token no localStorage.
   */
  private hasToken(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}