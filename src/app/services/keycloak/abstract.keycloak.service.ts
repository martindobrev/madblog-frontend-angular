import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakTokenParsed } from './../../type/keycloak';
import { User } from './../../api/user';

@Injectable()
export abstract class AbstractKeycloakService {
    abstract init(): Promise<any>;
    abstract login();
    abstract logout(redirectUri?: string);
    abstract canPublishArticles(): boolean;
    abstract canCreateArticles(): boolean;
    abstract getKeycloakTokenParsed$(): Observable<KeycloakTokenParsed>;
    abstract getCurrentToken(): string;
    abstract getUserInfo(id: string): Observable<User>;
    abstract isAdmin(): boolean;
}
