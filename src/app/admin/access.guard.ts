import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractKeycloakService } from '../services/keycloak/abstract.keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate, CanLoad {


  constructor(private keycloakService: AbstractKeycloakService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    //console.log('CAN LOAD ROUTE: ', route, segments);

    if (false == this.keycloakService.canCreateArticles()) {
      this.keycloakService.login();
      return false;
    }

    if (route.path.includes('pages') || route.path.includes('users')) {
      return this.keycloakService.isAdmin();
    }

    return true;
  }

  
}
