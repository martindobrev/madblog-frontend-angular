import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractKeycloakService } from '../services/keycloak/abstract.keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate, CanLoad {

  constructor(private keycloakService: AbstractKeycloakService) {
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('Trying to log out from canActivate...');
      this.keycloakService.logout();
    return true;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Trying to log out from canLoad...');
    this.keycloakService.logout();
    return true;
  }
}
