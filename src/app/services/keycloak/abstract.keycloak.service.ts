import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { KeycloakTokenParsed } from "./../../type/keycloak";

@Injectable()
export abstract class AbstractKeycloakService {
    abstract init(): Promise<any>;
    abstract login();
    abstract logout();
    abstract canPublishArticles(): boolean;
    abstract canCreateArticles(): boolean;
    abstract getKeycloakTokenParsed$(): Observable<KeycloakTokenParsed>;
    abstract getCurrentToken(): string;
}