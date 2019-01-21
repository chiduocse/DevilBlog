import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oAuthService: OAuthService) {}
  public redirectUrl: string;

  public logIn(userName: string, password: string, rememberMe?: boolean) {
    if (this.isLoggedIn) {
      this.logOut();
    }
    return this.oAuthService
      .fetchTokenUsingPasswordFlow(userName, password)
      .then((x: any) => {
        console.log(x);
        this.oAuthService.setupAutomaticSilentRefresh();
      });
  }

  get accessToken(): string {
    return this.oAuthService.getAccessToken();
  }

  get isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  public logOut(): void {
    this.oAuthService.logOut();
  }
}
