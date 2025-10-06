import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header'; 
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs'; // <--- PRECISA DE Observable

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent], 
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'GameLog';
  
  // 1. Apenas declara a propriedade (adicionando o tipo Observable)
  isLoggedIn$!: Observable<boolean>; 

  constructor(private authService: AuthService) {
    // 2. Inicializa a propriedade DENTRO do construtor, onde 'this.authService' existe
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}