import { Injectable } from '@angular/core';
import { AbstractKeycloakService } from '../keycloak/abstract.keycloak.service';
import { Resolve } from '@angular/router';
import { User } from './../../api/user';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<User> {

  private userId: string;

  constructor(private keycloakService: AbstractKeycloakService) { }

  resolve(): Observable<User> { 
    this.keycloakService.getKeycloakTokenParsed$().subscribe(parsedKeycloakToken => {
      parsedKeycloakToken.realm_access;
      parsedKeycloakToken.resource_access;
      this.userId = parsedKeycloakToken.sub;
    });
    return this.keycloakService.getUserInfo(this.userId);
  }
}
