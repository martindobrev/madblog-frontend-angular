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
        const articleCollectionList = [
            this.articleCollection.featured,
            this.articleCollection.own, 
            this.articleCollection.published, 
            this.articleCollection.unpublished
        ];
        articleCollectionList.forEach(articles => {
            if (articles) {
                let articleFound = articles.find((article) => {return article.id === id});
                if (articleFound) {
                    return articleFound;
                }
            }
        });
        return null;
    }
}