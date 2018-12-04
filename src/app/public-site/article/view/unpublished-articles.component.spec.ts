import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpublishedArticlesComponent } from './unpublished-articles.component';
import { ArticleCollection } from './../../../api/article';
import { of } from 'rxjs';
import { KeycloakMockService } from './../../../services/keycloak/keycloak-mock.service';
import { ActivatedRoute } from '@angular/router';
import { AbstractKeycloakService } from './../../../services/keycloak/abstract.keycloak.service';
import { ArticleListComponent } from './article-list.component';

describe('UnpublishedArticlesComponent', () => {
  let component: UnpublishedArticlesComponent;
  let fixture: ComponentFixture<UnpublishedArticlesComponent>;

  let articleCollection = new ArticleCollection();
  articleCollection.featured = [];
  articleCollection.own = [];
  articleCollection.published = [];
  articleCollection.unpublished = [];

  let activatedRouteMock = {
    data: of({articles: articleCollection})
  };

  let keycloakMockServiceFactory = () => {
    return new KeycloakMockService(true, true);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpublishedArticlesComponent, ArticleListComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: AbstractKeycloakService, useFactory: keycloakMockServiceFactory }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpublishedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
