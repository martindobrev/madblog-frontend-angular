import { TestBed, async, inject } from '@angular/core/testing';

import { AccessGuard } from './access.guard';
import { AbstractKeycloakService } from '../services/keycloak/abstract.keycloak.service';
import { KeycloakTokenParsed } from '../type/keycloak';
import { KeycloakMockService } from '../services/keycloak/keycloak-mock.service';
import { Route } from '@angular/router';
import { createMockServiceFactory } from '../services/keycloak/keycloak-mock.service';

var roles = ['user', 'admin'];

let mockFactory = () => {
  return createMockServiceFactory(roles);
}


const pageRoute: Route = {
  path: 'pages'
};

const articlesRoute: Route = {
  path: 'articles'
};

const fileManagerRoute: Route = {
  path: 'file-manager'
};

var guard: AccessGuard;

describe('AccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessGuard, {
        provide: AbstractKeycloakService, useFactory: mockFactory
      }]
    });
  });
  
  it('should not let pages route to be loaded with access role user', () => {
    roles = ['user'];
    guard = new AccessGuard(TestBed.get(AbstractKeycloakService));
    expect(guard.canLoad(pageRoute, [])).toBeFalsy();
  });

  
  it('should not let pages route to be loaded with access roles user and publisher', () => {
    roles = ['user', 'publisher'];
    guard = new AccessGuard(TestBed.get(AbstractKeycloakService));
    expect(guard.canLoad(pageRoute, [])).toBeFalsy();
  });

  
  it('should let pages to be loaded with access role admin', () => {
    roles = ['user', 'admin'];
    guard = new AccessGuard(TestBed.get(AbstractKeycloakService));
    expect(guard.canLoad(pageRoute, [])).toBeTruthy();
  });

  it('should let articles to be loaded with access role user', () => {
    roles = ['user'];
    guard = new AccessGuard(TestBed.get(AbstractKeycloakService));
    expect(guard.canLoad(articlesRoute, [])).toBeTruthy();
  });

});
