import { AbstractKeycloakService } from "./abstract.keycloak.service";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { KeycloakTokenParsed } from "./../../type/keycloak";

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
}