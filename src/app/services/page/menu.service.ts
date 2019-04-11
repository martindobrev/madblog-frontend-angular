import { Injectable } from '@angular/core';
import { Menu } from '../../api/menu';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page, PageCollection } from '../../api/page';
import { PageInfo } from '../../api/page-info';

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

  getPageById(id: number): Observable<Page> {
    return this.httpClient.get(`/api/v1/pages/single?id=${id}`) as Observable<Page>;
  }

  editPage(page: Page): Observable<Page> {
    return this.httpClient.put(`/api/v1/pages/${page.id}`, page) as Observable<Page>;
  }

  getPages(): Observable<PageCollection> {
    return this.httpClient.get(`/api/v1/pages`) as Observable<PageCollection>;
  }

  createPage(page: Page): Observable<Page> {
    return this.httpClient.post(`/api/v1/pages`, page) as Observable<Page>;
  }

  reorderPages(pageCollection: PageCollection): Observable<PageCollection> {
    return this.httpClient.post(`/api/v1/pages/reorder`, pageCollection) as Observable<PageCollection>;
  }

  deletePage(page: Page): Observable<Page> {
    if (page) {
      return this.httpClient.delete(`/api/v1/pages/${page.id}`) as Observable<Page>;
    }

    return of(null);
  }

  getPageInfo(): Observable<PageInfo> {
    return this.httpClient.get('/api/v1/info/pages') as Observable<PageInfo>;
  }
}
