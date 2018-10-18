import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ArticleCollection } from '../../api/article';
import { ArticleService } from './article.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleCollectionResolveService implements Resolve<ArticleCollection> {

  constructor(private articleService: ArticleService) { }

  resolve(): Observable<ArticleCollection> {
    return this.articleService.getArticles();
  }
}
