import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Header } from './shared/header/header'; // <--- MUDANÇA AQUI
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    Header 
  ], 
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'GameLog';
  isLoggedIn$!: Observable<boolean>; 

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$; //
  }
}