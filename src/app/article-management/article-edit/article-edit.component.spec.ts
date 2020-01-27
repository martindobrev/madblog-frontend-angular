import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEditComponent } from './article-edit.component';
import { FormsModule } from '@angular/forms';
import { ArticleMockService } from '../../services/article/article-mock.service';
import { ArticleCollection, Article } from '../../api/article';
import { AbstractArticleService } from '../../services/article/abstract.article.service';
import { KeycloakMockService } from '../../services/keycloak/keycloak-mock.service';
import { AbstractKeycloakService } from '../../services/keycloak/abstract.keycloak.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { User } from '../../api/user';
import { of } from 'rxjs';
import { createMockServiceFactory } from './../../services/keycloak/keycloak-mock.service';


describe('ArticleEditComponent', () => {
  let component: ArticleEditComponent;
  let fixture: ComponentFixture<ArticleEditComponent>;


  let articleServiceFactory = () => {
    return new ArticleMockService(new ArticleCollection());
  }

  let keycloakServiceFactory = () => {
    return createMockServiceFactory(['admin']);
  }

  let routerMock = {
    navigateByUrl: function() {}
  }

  let activatedRouteMock = {
    data: of({
      articleAndUserArray: [new Article(), new User()]
    })
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleEditComponent ],
      imports: [ FormsModule, RouterModule ],
      providers: [
        { provide: AbstractArticleService, useFactory: articleServiceFactory },
        { provide: AbstractKeycloakService, useFactory: keycloakServiceFactory },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
