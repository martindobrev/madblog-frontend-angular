import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../api/article';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractArticleService } from '../../services/article/abstract.article.service';
import { Subscription } from 'rxjs';
import { User } from '../../api/user';
import { AbstractKeycloakService } from '../../services/keycloak/abstract.keycloak.service';
import { AbstractFileService } from '../../services/file/abstract.file.service';
import { BlogFile } from '../../api/blog-file';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit, OnDestroy {
  
  article: Article;
  canUserPublishArticles: boolean = false;
  articleAvailable = false;
  create = false;
  
  private BACKGROUND_IMAGE = 'BACKGROUND';

  private subscriptions: Array<Subscription> = [];

  constructor(private activatedRoute: ActivatedRoute,
    private keycloakService: AbstractKeycloakService,
    private articleService: AbstractArticleService,
    private router: Router,
    private fileService: AbstractFileService,
    ) { 
    this.subscriptions.push(
      this.activatedRoute.data.subscribe(data => {
        this.article = data.article;
        if (this.article) {
          if (this.article.editable) {
            this.articleAvailable = true;
          }
        }
      })
    );

    this.subscriptions.push(
      this.fileService.getFileSelected$().subscribe((data: {id: string, file: BlogFile}) => {
        if (data.id === this.BACKGROUND_IMAGE) {
          this.article.imageId = data.file.id;
          this.fileService.hideFileManager(data.id);
        }
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
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute});
    })
    );
  }

  openFileManager() {
    this.fileService.showFileManager(this.BACKGROUND_IMAGE);
  }
}
