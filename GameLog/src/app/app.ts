// src/app/app.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header'; // <--- Importe aqui!

@Component({
  selector: 'app-root',
  standalone: true,
  // Adicione HeaderComponent e RouterOutlet aos imports
  imports: [RouterOutlet, HeaderComponent], 
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'GameLog';
}