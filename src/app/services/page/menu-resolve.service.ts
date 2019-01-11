import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Menu } from '../../api/menu';
import { Observable, of } from 'rxjs';
import { MenuService } from './menu.service';
import { catchError, map } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class MenuResolveService implements Resolve<Menu> {

  constructor(private menuService: MenuService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Menu> {

    return this.menuService.getMenuEntries().pipe(
      
      map((data: Menu) => {
        console.log('MENU is: ', data);
        return data;
      }),
      
      // in case of error, return en empty menu object
      catchError(err => {
        console.log('TEST');
        const menu = new Menu();
        menu.menuEntries = [];
        return of(menu);
      })
    );
  }
}
