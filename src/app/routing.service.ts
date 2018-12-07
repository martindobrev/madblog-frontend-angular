import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private currentUrl = new BehaviorSubject('/');
  currentUrl$ = this.currentUrl.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      console.log('NAVIGATION EVENT');
      if (event instanceof NavigationEnd) {
        console.log('-----> NEXT URL IS: ' + event.url);
        this.currentUrl.next(event.url);
      }
    });
  }
}
