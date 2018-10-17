import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleCollection, Article } from './api/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) {}

  public getArticles(): Observable<ArticleCollection> {
    return this.httpClient.get<ArticleCollection>("/api/v1/articles");
  }

  public getArticle(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`/api/v1/articles/${id}`);
  }

  public createArticle(article: Article): Observable<Object> {
    return this.httpClient.post(`/api/v1/articles`, article);
  }


  public editArticle(article: Article): Observable<Object> {
    return this.httpClient.put(`/api/v1/articles/${article.id}`, article);
  }
}
