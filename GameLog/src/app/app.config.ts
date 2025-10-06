// src/app/app.config.ts (Versão Completa e Final)

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router'; 
import { routes } from './app.routes'; 
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// <--- NOVO IMPORT AQUI: Suporte a Reactive Forms
import { provideState, provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Roteamento
    provideRouter(routes), 
    
    // Animações (para Material)
    provideAnimations(), 
    
    // HTTP
    provideHttpClient(withInterceptorsFromDi()),
    
    // Se você estiver usando Forms, você deve adicionar o fornecimento aqui
    // Embora o ReactiveFormsModule possa ser importado no componente, a configuração do estado pode ser crucial:
    // TENTE ADICIONAR ESTE ABAIXO SE A TELA AINDA ESTIVER EM BRANCO. 
    // provideState({}), 
    // provideStore({}),
    
    // ... [outros fornecedores que você possa ter]
    
    provideClientHydration(),
  ]
};