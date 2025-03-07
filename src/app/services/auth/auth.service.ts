import {inject, Injectable} from '@angular/core';
import {AuthConfig, OAuthEvent, OAuthService} from 'angular-oauth2-oidc';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private oAuthService = inject(OAuthService);

  constructor() {
    this.initConfiguration();
  }

  initConfiguration() {
    const authConfig: AuthConfig = {
      issuer: 'http://localhost:9000',
      strictDiscoveryDocumentValidation: false,
      clientId: 'edulink-client',
      requireHttps: false,
      responseType: 'code',
      postLogoutRedirectUri: '/login',
      redirectUri: window.location.origin + '/dashboard',
      scope: 'openid',
      useHttpBasicAuth: false,
      disablePKCE: false,
      logoutUrl: '/logout',
    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setStorage(localStorage);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }

  getProfile() {
    return this.oAuthService.getIdentityClaims();
  }

  getToken() {
    return this.oAuthService.hasValidAccessToken();
  }

  isAuthenticated(): boolean {
    return !!this.oAuthService.getAccessToken();
  }

  getEvents(): Observable<OAuthEvent> {
    return this.oAuthService.events;
  }

  silentRefresh(): Promise<OAuthEvent> {
    return this.oAuthService.silentRefresh();
  }
}
