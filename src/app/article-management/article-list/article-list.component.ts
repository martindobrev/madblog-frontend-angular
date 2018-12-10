import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../api/article';
import { AbstractKeycloakService } from '../../services/keycloak/abstract.keycloak.service';
import { AbstractArticleService } from '../../services/article/abstract.article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  @Input() title: string;
  articles: Array<Article> = [];
  
  canPublishArticles: boolean;

  constructor(private keycloakService: AbstractKeycloakService, private articleService: AbstractArticleService,
     private activatedRoute: ActivatedRoute) { 
    this.canPublishArticles = keycloakService.canPublishArticles();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.articles = data.articleCollection.articles;
    });
  }

  articlePublishedChanged(article: Article, event: any) {
    const articleToBeSaved = article;
    articleToBeSaved.published = event.target.checked;

    this.articleService.editArticle(articleToBeSaved).subscribe(article => {
      console.log('CHANGED ARTICLE CONTENT IS: ' + article);
    });
    

    console.log('Article ' + article.id + ' published: ' , event.target.checked);
  }

}
