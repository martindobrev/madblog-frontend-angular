import { AbstractArticleService } from "./abstract.article.service";
import { Article, ArticleCollection } from '../../api/article';
import { Observable, of } from 'rxjs';

export class ArticleMockService extends AbstractArticleService {
    
    
    
    constructor(private articleCollection: ArticleCollection) {
        super();
    }

    getArticles(): Observable<ArticleCollection> {
        return of(this.articleCollection);
    }

    getCompleteArticles(): Observable<ArticleCollection> {
        throw new Error("Method not implemented.");
    }
    
    getArticle(id: string): Observable<Article> {
        return of(this.findArticleInCollection(id));
    }
    
    createArticle(article: Article): Observable<Article> {
        throw new Error("Method not implemented.");
    }
    
    editArticle(article: Article): Observable<Article> {
        throw new Error("Method not implemented.");
    }
    private findArticleInCollection(id: string): Article {
        return this.articleCollection.articles.find((article) => {return article.id === id});
    }
}