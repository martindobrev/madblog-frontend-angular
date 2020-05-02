import { AbstractKeycloakService } from './abstract.keycloak.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { KeycloakTokenParsed } from './../../type/keycloak';
import { User } from './../../api/user';

@Injectable()
export class KeycloakMockService extends AbstractKeycloakService {

    constructor(private publishArticles: boolean, private createArticles: boolean, private tokenParsed: KeycloakTokenParsed) {
        super();
    }

    init(): Promise<any> {
        console.log(`Initiating Keycloak Mock Service`);
        return new Promise((resolve, reject) => {
            console.log(`Resolving promise...`);
            resolve();
        });
    }

    login() {}

    logout() {}

    canPublishArticles(): boolean {
        return this.publishArticles;
    }
    canCreateArticles(): boolean {
        return this.createArticles;
    }

    getKeycloakTokenParsed$(): Observable<KeycloakTokenParsed> {
        return of(this.tokenParsed);
    }

    getCurrentToken(): string {
        return '';
    }

    getUserInfo(): Observable<User> {
        const user = new User();
        user.firstname = 'Tim';
        user.lastname = 'Test';
        user.roles = this.tokenParsed.realm_access.roles;
        user.id = 'TEST_USER';
        user.username = 'MOCK-ADMIN';
        return of(user);
    }

    isAdmin(): boolean {
        if (!this.tokenParsed) {
            return false;
        }

        if (!this.tokenParsed.realm_access) {
            return false;
        }

        if (!this.tokenParsed.realm_access.roles) {
            return false;
        }

        return this.tokenParsed.realm_access.roles.includes('admin');
    }
}

export function createMockServiceFactory(roles: Array<string>): AbstractKeycloakService {
    const tokenParsed: KeycloakTokenParsed = {
        realm_access: { roles: roles },
        resource_access: {},
        //preferred_username: 'MOCK_USER'
    };

    const isUser = tokenParsed.realm_access.roles.includes('user');
    const isPublisher = tokenParsed.realm_access.roles.includes('publisher');
    const isAdmin = tokenParsed.realm_access.roles.includes('admin');
    return new KeycloakMockService(isPublisher, isUser, tokenParsed);
}
