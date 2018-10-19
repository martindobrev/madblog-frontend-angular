import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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

export function kcFactory(keycloakService: AbstractKeycloakService) {
  return () => keycloakService.init();
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleViewComponent,
    ArticleEditComponent,
    ArticleCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: AbstractArticleService, useClass: ArticleService },
    { provide: AbstractKeycloakService, useClass: KeycloakService },
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [AbstractKeycloakService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
