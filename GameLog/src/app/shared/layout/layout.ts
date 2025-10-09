// // src/app/shared/layout/layout.ts

// import { Component } from '@angular/core';
// import { Router, RouterModule, RouterOutlet } from '@angular/router'; 
// import { CommonModule } from '@angular/common'; 

// // Imports do Material
// import { MatSidenavModule } from '@angular/material/sidenav'; // O novo Sidebar
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';

// // Serviços
// import { AuthService } from '../../core/auth.service'; 


// @Component({
//   selector: 'app-layout',
//   standalone: true,
//   imports: [
//     CommonModule, RouterModule, RouterOutlet, // RouterOutlet renderiza o conteúdo
//     MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule
//   ],
//   templateUrl: './layout.html',
//   styleUrls: ['./layout.scss']
// })
// export class Layout { 
  
//   // Propriedades para o Sidebar
//   isMenuOpen = true; 
  
//   constructor(
//     private router: Router,
//     private readonly authService: AuthService 
//   ) { }

//   logout(): void {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }