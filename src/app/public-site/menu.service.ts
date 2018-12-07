import { Injectable } from '@angular/core';
import { Menu } from '../api/menu';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from '../api/page';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Returns the available public site menu entries (available public pages)
   */
  getMenuEntries(): Observable<Menu> {
    return this.httpClient.get('/api/v1/menu') as Observable<Menu>;  
  }

  getPage(slug: string): Observable<Page> {
    return this.httpClient.get(`/api/v1/pages/${slug}`) as Observable<Page>;
  }
}
