import { Injectable } from '@angular/core';
import { RoutingService } from '../routing.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardMenuService {

  private dashboardMenuItems: Subject<Array<DashboardMenuItem>> = new Subject();

  dashboadMenuItem$ = this.dashboardMenuItems.asObservable();

  private urlOptions = {
    '/admin/articles': [
      { label: 'create new article', url: '/admin/articles/create'},
      //{ label: 'delete all articles', url: '/admin/articles/deleteAll'},
    ],
    '/admin/pages': [
      { label: 'create new page', url: '/admin/pages/create'}
    ],
    '/admin/snippets': [
      { label: 'create new snippet', url: '/admin/snippets/create'}
    ]
  }

  constructor(private routingService: RoutingService) { 
    routingService.currentUrl$.subscribe(url => {
      const menuItems = this.urlOptions[url] as Array<DashboardMenuItem>;
      if (!menuItems) {
        this.dashboardMenuItems.next([]);
      } else {
        this.dashboardMenuItems.next(menuItems);
      }
    });
  }
}

export class DashboardMenuItem {
  public label: string;
  public url: string;
}