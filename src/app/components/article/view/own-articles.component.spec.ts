import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnArticlesComponent } from './own-articles.component';
import { ArticleListComponent } from './article-list.component';
import { ActivatedRoute } from '@angular/router';
import { ArticleCollection } from './../../../api/article';
import { of } from 'rxjs';
import { KeycloakMockService } from './../../../services/keycloak/keycloak-mock.service';
import { AbstractKeycloakService } from './../../../services/keycloak/abstract.keycloak.service';

describe('OwnArticlesComponent', () => {
  let component: OwnArticlesComponent;
  let fixture: ComponentFixture<OwnArticlesComponent>;

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
      declarations: [ OwnArticlesComponent, ArticleListComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: AbstractKeycloakService, useFactory: keycloakMockServiceFactory }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
