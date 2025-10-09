import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router'; 
import { routes } from './app.routes'; 
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Roteamento
    provideRouter(routes), 
    
    provideHttpClient(withInterceptorsFromDi()),
    
    provideClientHydration(),
  ]
};