import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WebsiteProperties } from './../../api/website_properties';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsResolveService implements Resolve<WebsiteProperties> {

  constructor(private httpClient: HttpClient) {} 
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): WebsiteProperties | Observable<WebsiteProperties> | Promise<WebsiteProperties> {
    return this.httpClient.get('/api/v1/settings') as Observable<WebsiteProperties>;
  }
  
}
