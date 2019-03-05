import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCreateComponent } from './article-create.component';
import { FormsModule } from '@angular/forms';
import { ArticleMockService } from '../../services/article/article-mock.service';
import { ArticleCollection, Article } from '../../api/article';
import { AbstractArticleService } from '../../services/article/abstract.article.service';
import { KeycloakMockService } from '../../services/keycloak/keycloak-mock.service';
import { AbstractKeycloakService } from '../../services/keycloak/abstract.keycloak.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../../api/user';

import { createMockServiceFactory } from './../../services/keycloak/keycloak-mock.service';

describe('ArticleCreateComponent', () => {
  let component: ArticleCreateComponent;
  let fixture: ComponentFixture<ArticleCreateComponent>;
  articleAvailable = false;

  let articleServiceFactory = () => {
    return new ArticleMockService(new ArticleCollection());
  }

  let keycloakServiceFactory = () => {
    return createMockServiceFactory(['user']);
  }

  let routerMock = {
    navigateByUrl: function() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCreateComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: AbstractArticleService, useFactory: articleServiceFactory },
        { provide: AbstractKeycloakService, useFactory: keycloakServiceFactory },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
