import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { KeycloakInstance, KeycloakTokenParsed } from '../../type/keycloak';
import { AbstractKeycloakService } from './abstract.keycloak.service';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService extends AbstractKeycloakService {
  
  private keycloakAuth: KeycloakInstance;
  
  private profile = new BehaviorSubject<KeycloakTokenParsed>(null);
  private profile$ = this.profile.asObservable();

  constructor() {
    super();
    console.log('CREATING KEYCLOAK_SERVICE');
  }

  public getKeycloakTokenParsed$(): Observable<KeycloakTokenParsed> {
    return this.profile$;
  }

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        'url': 'http://localhost:8080/auth',
        'realm': 'Demo',
        'clientId': 'angular'
      };
      this.keycloakAuth = new Keycloak(config);
      
      this.keycloakAuth.onTokenExpired = () => {
        this.keycloakAuth.updateToken(30).success(refreshed => {
          console.log('TOKEN SUCCESSFULLY UPDATED');
        }).error(() => {
          // alert('Cannot update token, redirecting to homepage...');
          window.location.href = '/';
        });
      };

      this.keycloakAuth.init({ onLoad: 'check-sso'})
        .success(() => {
          this.profile.next(this.keycloakAuth.tokenParsed);
          console.log('PROFILE IS:', this.keycloakAuth.tokenParsed);
          resolve();
        })
        .error(() => {
          // resolve();
        });
      });
  }

  getCurrentToken(): string {
    if (!this.keycloakAuth) {
      return null;
    }

    return this.keycloakAuth.token;
  }

  login() {
    this.keycloakAuth.login();
  }

  logout() {
    if (this.keycloakAuth) {
      this.keycloakAuth.logout();
    }
  }

  canPublishArticles(): boolean {
    if (!this.profile.value) {
      return false;
    }
    //this.profile.value.
    let roles = this.profile.value.realm_access.roles;
    return roles.includes('publisher') || roles.includes('admin');
  }
  
  canCreateArticles(): boolean {
    if (!this.profile.value) {
      return false;
    }
    let roles = this.profile.value.realm_access.roles;
    return roles.includes('user') || roles.includes('publisher') || roles.includes('admin');
  }
}
