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
import { element } from 'protractor';

describe('ArticleCreateComponent', () => {
  let component: ArticleCreateComponent;
  let fixture: ComponentFixture<ArticleCreateComponent>;
  const articleAvailable = false;
  // tslint:disable-next-line: no-shadowed-variable
  let element: HTMLElement;

  const articleServiceFactory = () => {
    return new ArticleMockService(new ArticleCollection());
  };

  const keycloakServiceFactory = () => {
    return createMockServiceFactory(['user']);
  };

  const routerMock = {
    navigateByUrl: function() {}
  };

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
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

});
