import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { ArticleCollection } from '../../api/article';
import { AbstractArticleService } from './abstract.article.service';
import { Observable, empty, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleCollectionResolveService implements Resolve<ArticleCollection> {

  constructor(private articleService: AbstractArticleService, private router: Router) { }

  resolve(): Observable<ArticleCollection> {
    return this.articleService.getArticles().pipe(
      map(articleCollection => {
        return articleCollection;
      }),

      catchError(error => {
        console.log('Cannot get articles, returning empty collection instead', error);
        this.router.navigateByUrl('/error5xx');
        const emptyArticleCollection = new ArticleCollection();
        emptyArticleCollection.articles = [];
        return of(emptyArticleCollection);
      })
    );
  }
}