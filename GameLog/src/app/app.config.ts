// src/app/app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router'; // <-- ESSENCIAL PARA O ROTEAMENTO

import { routes } from './app.routes'; 
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- ESSENCIAL PARA O MATERIAL

// Se você estiver usando Reactive Forms no projeto (e nós estamos!), adicione este:
import { provideHttpClient } from '@angular/common/http';
import { withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // 1. FORNECE O ROTEAMENTO (Chama o app.routes.ts)
    provideRouter(routes), 
    
    // 2. FORNECE AS ANIMAÇÕES (NECESSÁRIO para o Angular Material e MatTabs)
    provideAnimations(), 
    
    // 3. (Opcional, mas boa prática)
    provideClientHydration(),
    
    // 4. Se você planeja usar HTTP (que o Angular Material usa internamente)
    provideHttpClient(withInterceptorsFromDi())
  ]
};