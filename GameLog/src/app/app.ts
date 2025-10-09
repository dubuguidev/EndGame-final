import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router'; // Importar Router e ActivatedRoute
import { Header } from './shared/header/header'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from './core/auth.service'; 
import { Observable, filter, map } from 'rxjs'; // Importar filter e map para o router

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  
  isLoggedIn$: Observable<boolean>; 
  
  shouldShowHeader = false; 

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
  
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentUrl = event.urlAfterRedirects;
      
      this.shouldShowHeader = !currentUrl.includes('/login') && !currentUrl.includes('/register');
    });
  }
}