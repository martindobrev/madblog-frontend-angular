import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../../api/article';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractArticleService } from '../../../services/article/abstract.article.service';
import { Subscription } from 'rxjs';
import { User } from '../../../api/user';
import { AbstractKeycloakService } from '../../../services/keycloak/abstract.keycloak.service';
import { AbstractFileService } from '../../../services/file/abstract.file.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit, OnDestroy {
  
  article: Article;
  author: User;
  canUserPublishArticles: boolean = false;

  private subscriptions: Array<Subscription> = [];

  constructor(private activatedRoute: ActivatedRoute, private keycloakService: AbstractKeycloakService,
    private articleService: AbstractArticleService, private router: Router, private fileService: AbstractFileService) { 
    this.subscriptions.push(
      this.activatedRoute.data.subscribe(data => {
        this.article = data.articleAndUserArray[0];
        this.author = data.articleAndUserArray[1];
      })
    );

    this.subscriptions.push(
      this.fileService.getFileSelected$().subscribe(blogFile => {
        this.article.imageId = blogFile.id;
        this.fileService.hideFileManager();
      })
    );
  }

  ngOnInit() {
    this.canUserPublishArticles = this.keycloakService.canPublishArticles();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  saveArticle() {
    this.subscriptions.push(
    this.articleService.editArticle(this.article).subscribe(obj => {
      this.router.navigateByUrl(`/article/${this.article.id}` )
    })
    );
  }

  openFileManager() {
    this.fileService.showFileManager();
  }
}
