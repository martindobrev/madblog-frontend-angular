import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsiteProperties } from './../../api/website_properties';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  readonly FILES_PREFIX = '/api/v1/files/';


  private logoImageUrl: BehaviorSubject<string> = new BehaviorSubject(null);
  logoImageUrl$ = this.logoImageUrl.asObservable();

  private title: BehaviorSubject<string> = new BehaviorSubject(null);
  title$ = this.title.asObservable();

  private aboutUs: BehaviorSubject<string> = new BehaviorSubject(null);
  aboutUs$ = this.aboutUs.asObservable();

  constructor(private httpClient: HttpClient) { 
    this.httpClient.get('/api/v1/settings').subscribe((webProperties: WebsiteProperties) => {
      this.logoImageUrl.next(this.getFileUrl(webProperties ? webProperties.logoUrl : null));
      this.title.next(webProperties.title);
      this.aboutUs.next(webProperties.aboutUs);
    });
  }

  private getFileUrl(imageId: string): string {
    if (!imageId) {
      return null;
    }

    return `${this.FILES_PREFIX}${imageId}`;
  }

  saveProperties(webProperties: WebsiteProperties): Observable<WebsiteProperties> {
    this.logoImageUrl.next(this.getFileUrl(webProperties.logoUrl));
    this.title.next(webProperties.title);
    this.aboutUs.next(webProperties.aboutUs);
    return this.httpClient.post('/api/v1/settings', webProperties) as Observable<WebsiteProperties>;
  }
}
