import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoutingService } from './../../routing.service';
import { Subscription, Observable } from 'rxjs';
import { AbstractKeycloakService } from './../../services/keycloak/abstract.keycloak.service';
import { KeycloakTokenParsed } from '../../type/keycloak';
import { User } from './../../api/user';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardMenuService, DashboardMenuItem } from '../dashboard-menu.service';
import { SettingsService } from './../../services/settings/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentUrl: string;
  subscriptions: Array<Subscription> = [];
  userId: string;
  user: User;
  role: string;
  menuItems: Observable<Array<DashboardMenuItem>>;
  isAdmin: boolean;
  logoUrl$: Observable<string>;

  constructor(
    private routingService: RoutingService,
    private keycloakService: AbstractKeycloakService,
    private activatedRoute: ActivatedRoute,
    private dashboardMenuService: DashboardMenuService,
    private settingsService: SettingsService
    ) {
      this.menuItems = this.dashboardMenuService.dashboadMenuItem$;
     }

  ngOnInit() {

    this.isAdmin = this.keycloakService.isAdmin();

    this.subscriptions.push(
      this.routingService.currentUrl$.subscribe(url => this.currentUrl = url)
    );

    this.subscriptions.push(
      this.keycloakService.getKeycloakTokenParsed$().subscribe((parsedToken: KeycloakTokenParsed) => {
        this.userId = parsedToken.sub;
      })
    );

    this.subscriptions.push(
      this.activatedRoute.data.subscribe(data => {
        console.log('data is:', data);
        this.user = data.userData;
        this.role = 'user';
        if (this.user.roles.includes('publisher')) {
          this.role = 'publisher';
        }

        if (this.user.roles.includes('admin')) {
          this.role = 'admin';
        }
      })
    );

    this.logoUrl$ = this.settingsService.logoImageUrl$;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
