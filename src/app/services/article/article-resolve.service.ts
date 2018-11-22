import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Article } from '../../api/article';
import { AbstractArticleService } from './abstract.article.service';
import { Observable, of, forkJoin, empty } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { User } from '../../api/user';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolveService implements Resolve<Article> {

  constructor(private articleService: AbstractArticleService, private userService: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Article> {
    return this.articleService.getArticle(route.paramMap.get('id')).pipe(
      catchError((err, caught) => {
        this.router.navigateByUrl('/error404');
        return empty();
      }
    ));
  }
}
