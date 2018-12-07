import { Injectable } from '@angular/core';
import { Page } from '../api/page';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class PageResolveService implements Resolve<Page> {

  constructor(private menuService: MenuService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Page> {
    return this.menuService.getPage(route.paramMap.get('slug'));
  }
}
