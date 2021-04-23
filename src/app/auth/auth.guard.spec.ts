import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { createMockServiceFactory } from './../services/keycloak/keycloak-mock.service';
import { ArticleService } from './../services/article/article.service';
import { AbstractKeycloakService } from '../services/keycloak/abstract.keycloak.service';

var roles = ['admin', 'user'];

export function mockKeycloakFactory() {
  return createMockServiceFactory(roles);
}

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AbstractKeycloakService, useFactory: mockKeycloakFactory}
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
