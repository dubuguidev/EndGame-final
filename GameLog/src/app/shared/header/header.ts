// src/app/shared/header/header.ts

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/auth.service'; 


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {

  constructor(
    private router: Router,
    private readonly authService: AuthService 
  ) { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}