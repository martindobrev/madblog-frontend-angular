import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Article } from '../../api/article';
import { ArticleService } from './article.service';
import { Observable, of, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { User } from '../../api/user';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolveService implements Resolve<[Article, User]> {

  constructor(private articleService: ArticleService, private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<[Article, User]> {
    const articleObservable = this.articleService.getArticle(route.paramMap.get('id'));
    console.log('ARTICLE OBSERVER IS DEFINED...');
    const combinedObservable = articleObservable.pipe(mergeMap((article: Article) => {
      console.log('FORK JOIN OF ARTICLE: ', article);
      return forkJoin(of(article), this.userService.getUserInfo(article.authorId));
    }));

    return combinedObservable;
  }
}
