import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { KeycloakInstance, KeycloakTokenParsed } from '../../type/keycloak';
import { AbstractKeycloakService } from './abstract.keycloak.service';
import { HttpClient } from '@angular/common/http';
import { User } from './../../api/user';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService extends AbstractKeycloakService {
  
  private keycloakAuth: KeycloakInstance;
  
  private profile = new BehaviorSubject<KeycloakTokenParsed>(null);
  private profile$ = this.profile.asObservable();

  constructor(private httpClient: HttpClient) {
    super();
    console.log('CREATING KEYCLOAK_SERVICE');
  }

  public getKeycloakTokenParsed$(): Observable<KeycloakTokenParsed> {
    return this.profile$;
  }

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        'url': 'https://guard.maddob.com/auth',
        'realm': 'MADDOB_SITE',
        'clientId': 'angular_web_dev'
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

  logout(redirectUri?: string) {
    if (this.keycloakAuth) {
      if (redirectUri) {
        this.keycloakAuth.logout({redirectUri: redirectUri});
      } else {
        this.keycloakAuth.logout();
      }
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

  getUserInfo(id: string): Observable<User> {
    console.log('Retrieving user with id: ', id);
    const user = new User();
    if (!id) {
      user.username = 'ANONYMOUS';
      return of(user);
    }

    if (this.profile) {
      user.username = this.profile.value.preferred_username;
      user.roles = this.profile.value.realm_access.roles;
    } else {
      user.username = 'ANONYMOUS';
    }
    
    return of(user); 
  }

  isAdmin(): boolean {
    if (!this.profile.value) {
      return false;
    }
    //this.profile.value.
    let roles = this.profile.value.realm_access.roles;
    return roles.includes('admin');
  }
}
