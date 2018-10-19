import { AbstractKeycloakService } from "./abstract.keycloak.service";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { KeycloakTokenParsed } from "./../../type/keycloak";

@Injectable()
export class KeycloakMockService extends AbstractKeycloakService {
    
    constructor(private publishArticles: boolean, private createArticles: boolean) {
        super();
    }
    
    init(): Promise<any> {
        return new Promise(() => {});
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
        return of({});
    }
    
    getCurrentToken(): string {
        return '';
    }
}