import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // <--- ONDE ESTÃO O *ngIf E | async
import { Header } from './shared/header/header'; 
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // <--- ESTE ITEM RESOLVE O ERRO NG0302 DO | async
    RouterOutlet, 
    Header
  ], 
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'GameLog';
  
  // 1. Apenas declara a propriedade
  isLoggedIn$!: Observable<boolean>; 

  constructor(private authService: AuthService) {
    // 2. Inicializa a propriedade DENTRO do construtor
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}