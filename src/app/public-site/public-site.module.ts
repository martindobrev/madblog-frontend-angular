import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicSiteRoutingModule } from './public-site-routing.module';
import { HomeComponent } from './home/home.component';
import { ArticleViewComponent } from './article/view/article-view.component';
import { ArticleEditComponent } from './article/edit/article-edit.component';
import { ArticleCreateComponent } from './article/create/article-create.component';
import { ArticleListComponent } from './article/view/article-list.component';
import { OwnArticlesComponent } from './article/view/own-articles.component';
import { UnpublishedArticlesComponent } from './article/view/unpublished-articles.component';
import { FormsModule } from '@angular/forms';
import { MarkdownEditorComponent } from './markdown/markdown-editor.component';
import { MainComponent } from './main/main.component';
import { Error404Component } from './error404/error404.component';
import { PageViewComponent } from './page-view/page-view.component';
import { ServerErrorComponent } from './server-error/server-error.component';

@NgModule({
  imports: [
    CommonModule,
    PublicSiteRoutingModule,
    FormsModule
  ],
  declarations: [
    Error404Component,
    MainComponent,
    HomeComponent,
    ArticleViewComponent,
    ArticleEditComponent,
    ArticleCreateComponent,
    ArticleListComponent,
    OwnArticlesComponent,
    UnpublishedArticlesComponent,
    MarkdownEditorComponent,
    PageViewComponent,
    ServerErrorComponent
  ]
})
export class PublicSiteModule { }
