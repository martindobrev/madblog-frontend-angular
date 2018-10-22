import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ArticleViewComponent } from './components/article/view/article-view.component';
import { ArticleEditComponent } from './components/article/edit/article-edit.component';
import { ArticleCreateComponent } from './components/article/create/article-create.component';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakMockService } from './services/keycloak/keycloak-mock.service';
import { AbstractKeycloakService } from './services/keycloak/abstract.keycloak.service';
import { AbstractArticleService } from './services/article/abstract.article.service';
import { ArticleMockService } from './services/article/article-mock.service';
import { ArticleCollection } from './api/article';
import { OwnArticlesComponent } from './components/article/view/own-articles.component';
import { UnpublishedArticlesComponent } from './components/article/view/unpublished-articles.component';
import { ArticleListComponent } from './components/article/view/article-list.component';
describe('AppComponent', () => {

  let permissions = {
    createArticles: false,
    publishArticles: false
  };


  let keycloakMockServiceFactory = () => {
    return new KeycloakMockService(permissions.publishArticles, permissions.createArticles);
  }

  let articleMockServiceFactory = () => {
    return new ArticleMockService(new ArticleCollection());
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        HomeComponent,
        ArticleViewComponent,
        ArticleEditComponent,
        ArticleCreateComponent,
        ArticleListComponent,
        OwnArticlesComponent,
        UnpublishedArticlesComponent
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' },
      {provide: AbstractKeycloakService, useFactory: keycloakMockServiceFactory},
      {provide: AbstractArticleService, useFactory: articleMockServiceFactory}
    ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
  it('should set create articles to FALSE and publish articles to TRUE correctly', async(() => {
    permissions.createArticles = false;
    permissions.publishArticles = true;

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.canUserCreateArticles).toBeFalsy('user shall NOT be able to create articles');
    expect(fixture.componentInstance.showOwnArticles).toBeFalsy('user shall NOT be able to view own articles');
    expect(fixture.componentInstance.canUserPublishArticles).toBeTruthy('user shall be able to publish articles');
  }));

  it('should set create articles to TRUE and publish articles correctly to FALSE', async(() => {
    permissions.createArticles = true;
    permissions.publishArticles = false;

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.canUserCreateArticles).toBeTruthy('user shall  be able to create articles');
    expect(fixture.componentInstance.showOwnArticles).toBeTruthy('user shall be able to view own articles');
    expect(fixture.componentInstance.canUserPublishArticles).toBeFalsy('user shall NOT be able to publish articles');
  }));

  it('should set create articles to TRUE and publish articles correctly to TRUE', async(() => {
    permissions.createArticles = true;
    permissions.publishArticles = true;

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.canUserCreateArticles).toBeTruthy('user shall  be able to create articles');
    expect(fixture.componentInstance.showOwnArticles).toBeTruthy('user shall be able to view own articles');
    expect(fixture.componentInstance.canUserPublishArticles).toBeTruthy('user shall be able to publish articles');
  }));

  it('should set create articles to FALSE and publish articles to FALSE correctly', async(() => {
    permissions.createArticles = false;
    permissions.publishArticles = false;

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.canUserCreateArticles).toBeFalsy('user shall NOT be able to create articles');
    expect(fixture.componentInstance.showOwnArticles).toBeFalsy('user shall NOT be able to view own articles');
    expect(fixture.componentInstance.canUserPublishArticles).toBeFalsy('user shall NOT be able to publish articles');
  }));
});
