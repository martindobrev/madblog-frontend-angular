import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './http/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ArticleViewComponent } from './components/article/view/article-view.component';
import { ArticleEditComponent } from './components/article/edit/article-edit.component';
import { ArticleCreateComponent } from './components/article/create/article-create.component';
import { AbstractArticleService } from './services/article/abstract.article.service';
import { ArticleService } from './services/article/article.service';
import { AbstractKeycloakService } from './services/keycloak/abstract.keycloak.service';
import { ArticleListComponent } from './components/article/view/article-list.component';
import { OwnArticlesComponent } from './components/article/view/own-articles.component';
import { UnpublishedArticlesComponent } from './components/article/view/unpublished-articles.component';
import { FileUploadComponent } from './components/file/file-upload.component';
import { FileManagerComponent } from './components/file/file-manager.component';
import { AbstractFileService } from './services/file/abstract.file.service';
import { FileService } from './services/file/file.service';
import { ModalComponent } from './components/modal/modal.component';
import { ModalDirective } from './directives/modal.directive';
import { MarkdownEditorComponent } from './components/markdown/markdown-editor.component';
import { Error404Component } from './error404/error404.component';
import { MessageService } from './services/message/message.service';
import { AdminModule } from './admin/admin.module';

export function kcFactory(keycloakService: AbstractKeycloakService) {
  return () => keycloakService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleViewComponent,
    ArticleEditComponent,
    ArticleCreateComponent,
    ArticleListComponent,
    OwnArticlesComponent,
    UnpublishedArticlesComponent,
    FileUploadComponent,
    FileManagerComponent,
    ModalComponent,
    ModalDirective,
    MarkdownEditorComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    /* AdminModule, */
    AppRoutingModule,
    FormsModule,
    LMarkdownEditorModule
  ],
  providers: [
    { provide: AbstractArticleService, useClass: ArticleService },
    { provide: AbstractKeycloakService, useClass: KeycloakService },
    { provide: AbstractFileService, useClass: FileService },
    MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [AbstractKeycloakService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  entryComponents: [FileManagerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
