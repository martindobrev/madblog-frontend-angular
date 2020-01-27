import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from '../../api/article';
import { BlogFile } from '../../api/blog-file';
import { Router } from '@angular/router';
import { AbstractKeycloakService } from '../../services/keycloak/abstract.keycloak.service';
import { AbstractArticleService } from '../../services/article/abstract.article.service';
import { AbstractFileService } from '../../services/file/abstract.file.service';

declare var UIkit: any;

@Component({
  selector: 'app-article-create',
  templateUrl: './../article-edit/article-edit.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  article: Article = new Article();
  articleAvailable = false;
  canUserPublishArticles = false;
  showFileManager =  false;
  create = true;

  private subscriptions: Array<Subscription> = [];
  private BACKGROUND_IMAGE = 'CREATE_ARTICLE_BACKGROUND';

  constructor(private articleService: AbstractArticleService,
    private keycloakService: AbstractKeycloakService,
    private router: Router,
    private fileService: AbstractFileService) {
  }

  ngOnInit() {
    this.canUserPublishArticles = this.keycloakService.canPublishArticles();

    this.subscriptions.push(
      this.fileService.getFileSelected$().subscribe((data: {id: string, file: BlogFile}) => {
        if (data.id === this.BACKGROUND_IMAGE) {
          this.article.imageId = data.file.id;
          this.fileService.hideFileManager(data.id);
        }
      })
    );
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  saveArticle() {
    this.subscriptions.push(
    this.articleService.createArticle(this.article).subscribe(obj => {
      const article = obj as Article;
      this.router.navigateByUrl(`/article/${article.id}` );
    })
    );
  }

  openFileManager() {
    this.fileService.showFileManager(this.BACKGROUND_IMAGE);
  }
}
