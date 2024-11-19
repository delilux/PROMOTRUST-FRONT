import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtModule } from '@auth0/angular-jwt';
export function tokenGetter() {
  return sessionStorage.getItem('token');
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()), 
    provideAnimationsAsync(),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['https://promotrustback-fff2c4gdh7dffpb2.canadacentral-01.azurewebsites.net/'],
          disallowedRoutes: ['https://promotrustback-fff2c4gdh7dffpb2.canadacentral-01.azurewebsites.net//login/forget'],
        },
      })
    )
  ],
};
