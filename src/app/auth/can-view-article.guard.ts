import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractArticleService } from '../services/article/abstract.article.service';

@Injectable({
  providedIn: 'root'
})
export class CanViewArticleGuard implements CanActivate {

  constructor(private articleService: AbstractArticleService) {} 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
