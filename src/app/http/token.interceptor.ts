import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractKeycloakService } from '../services/keycloak/abstract.keycloak.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AbstractKeycloakService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getCurrentToken() || '';
    if (authToken) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + authToken
        }
      });
    }

    return next.handle(request);
  }
}