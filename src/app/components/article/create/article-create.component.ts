import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from '../../../api/article';
import { Router } from '@angular/router';
import { AbstractKeycloakService } from '../../../services/keycloak/abstract.keycloak.service';
import { AbstractArticleService } from './../../../services/article/abstract.article.service';
import { AbstractFileService } from './../../../services/file/abstract.file.service';

declare var UIkit: any;

@Component({
  selector: 'app-article-create',
  templateUrl: './../edit/article-edit.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  article: Article = new Article();
  canUserPublishArticles: boolean = false;
  showFileManager =  false;

  private subscriptions: Array<Subscription> = [];

  constructor(private articleService: AbstractArticleService, 
    private keycloakService: AbstractKeycloakService, 
    private router: Router, 
    private fileService: AbstractFileService) { 
  }

  ngOnInit() {
    this.canUserPublishArticles = this.keycloakService.canPublishArticles();

    this.fileService.getFileSelected$().subscribe(blogFile => {
      this.article.imageId = blogFile.id;
      this.fileService.hideFileManager();
    });
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

  openFileManager() {
    this.fileService.showFileManager();
  }
}
