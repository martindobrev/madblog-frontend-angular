import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ArticleCollection } from '../../api/article';
import { AbstractArticleService } from './abstract.article.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnArticleCollectionResolveService implements Resolve<ArticleCollection> {

  constructor(private articleService: AbstractArticleService) { }

  resolve(): Observable<ArticleCollection> {
    return this.articleService.getCompleteArticles();
  }
}