import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractKeycloakService } from '../services/keycloak/abstract.keycloak.service';
import { AbstractArticleService } from '../services/article/abstract.article.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private keycloakService: AbstractKeycloakService, private articleService: AbstractArticleService,
     private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('AuthGuard initiaited');

      if (!this.keycloakService.canCreateArticles()) {
        this.keycloakService.login();
        return false;
      }


      if (next.url.find(segment => segment.path.includes('admin'))) {
        console.log('Trying to access admin area, checking authentication...');
        //alert(this.keycloakService.canCreateArticles());
        if (false == this.keycloakService.canCreateArticles()) {
          this.keycloakService.login();
          return true;
        }
      }

      if (next.url.find(segment => segment.path.includes('file-manager'))) {
        if (false === this.keycloakService.canCreateArticles()) {
          this.router.navigateByUrl('/');
          return true;
        }
      }

      if (next.url.find(segment => segment.path.includes('edit'))) {
        console.log('Checking if user can edit articles...');
        if (!this.keycloakService.canCreateArticles()) {
          this.router.navigateByUrl('/');
          return false;
        }
      }

      if (next.url.find(segment => segment.path.includes('administer-articles'))) {
        if (!this.keycloakService.canCreateArticles()) {
          this.router.navigateByUrl('/');
          return false;
        }
      }

      return true;
  }
}
