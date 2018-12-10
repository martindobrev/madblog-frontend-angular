import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './http/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AbstractArticleService } from './services/article/abstract.article.service';
import { ArticleService } from './services/article/article.service';
import { AbstractKeycloakService } from './services/keycloak/abstract.keycloak.service';

import { AbstractFileService } from './services/file/abstract.file.service';
import { FileService } from './services/file/file.service';
import { MessageService } from './services/message/message.service';
import { PublicSiteModule } from './public-site/public-site.module';
import { RoutingService } from './routing.service';

export function kcFactory(keycloakService: AbstractKeycloakService) {
  return () => keycloakService.init();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    /* AdminModule, */
    AppRoutingModule,
    PublicSiteModule
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
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    RoutingService
  ],
  
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
