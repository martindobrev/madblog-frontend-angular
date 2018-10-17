import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from '../api/article';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { KeycloakService } from '../keycloak.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './../article-edit/article-edit.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  article: Article = new Article();
  canUserPublishArticles: boolean = false;

  private subscriptions: Array<Subscription> = [];

  constructor(private articleService: ArticleService, 
    private keycloakService: KeycloakService, private router: Router) { 
  }

  ngOnInit() {
    this.canUserPublishArticles = this.keycloakService.canUserPublishArticles();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  saveArticle() {
    this.subscriptions.push(
    this.articleService.createArticle(this.article).subscribe(obj => {
      let article = obj as Article;
      this.router.navigateByUrl(`/article/${article.id}` )
    })
    );
  }
}
