import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Article } from './api/article';
import { ArticleService } from './article.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolveService implements Resolve<Article> {

  constructor(private articleService: ArticleService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Article> {
    return this.articleService.getArticle(route.paramMap.get('id'));
  }
}
