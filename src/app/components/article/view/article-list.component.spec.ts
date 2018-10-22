import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListComponent } from './article-list.component';
import { KeycloakMockService } from './../../../services/keycloak/keycloak-mock.service';
import { AbstractKeycloakService } from './../../../services/keycloak/abstract.keycloak.service';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;

  let keycloakMockServiceFactory = () => {
    return new KeycloakMockService(true, true);
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleListComponent ],
      providers: [
        { provide: AbstractKeycloakService, useFactory: keycloakMockServiceFactory }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
