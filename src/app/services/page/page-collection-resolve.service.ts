import { Injectable } from '@angular/core';
import { PageCollection } from './../../api/page';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class PageCollectionResolveService implements Resolve<PageCollection>  {

  constructor(private menuService: MenuService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PageCollection> {
    return this.menuService.getPages();
  }
}


