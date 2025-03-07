import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideOAuthClient} from 'angular-oauth2-oidc';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {errorInterceptor} from './interceptors/auth/error/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideHttpClient(),
    provideOAuthClient(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideAnimationsAsync()]
};
