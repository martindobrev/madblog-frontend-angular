import { Resolve } from '@angular/router';
import { AbstractArticleService } from './abstract.article.service';
import { ArticlePage } from './../../api/article-page';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ArticlePageResolveService implements Resolve<ArticlePage> {

    constructor(private articleService: AbstractArticleService) {}

    resolve(): Observable<ArticlePage> {
        return this.articleService.getArticlePage(0, '');
    }

}
