import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloakAuth: any;
  private profile = new BehaviorSubject<any>(null);
  profile$ = this.profile.asObservable();

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        'url': 'http://localhost:8080/auth',
        'realm': 'Demo',
        'clientId': 'angular'
      };
      this.keycloakAuth = new Keycloak(config);
      
      this.keycloakAuth.init({ onLoad: 'check-sso'})
        .success(() => {
          this.profile.next(this.keycloakAuth.tokenParsed);
          resolve();
        })
        .error(() => {
          reject();
        });
      });
  }

  getToken(): string {
    console.log(this.keycloakAuth);
    if (this.keycloakAuth) {
      return this.keycloakAuth.token;
    }
    return null;
  }

  getProfile(): any {
    return this.profile;
  }

  login() {
    this.keycloakAuth.login();
  }

  logout() {
    if (this.keycloakAuth) {
      this.keycloakAuth.loggedIn = false;
      this.keycloakAuth.authz = null;
      this.keycloakAuth.logout();
    }
  }

  canUserPublishArticles() {
    if (!this.profile.value) {
      return false;
    }
    let roles = this.profile.value.realm_access.roles;
    return roles.includes('publisher') || roles.includes('admin');
  }

  canUserCreateArticles() {
    if (!this.profile.value) {
      return false;
    }
    let roles = this.profile.value.realm_access.roles;
    return roles.includes('user') || roles.includes('publisher') || roles.includes('admin');
  }
}
