import { Component, OnInit } from '@angular/core';
import { AbstractArticleService } from './services/article/abstract.article.service';
import { AbstractKeycloakService } from './services/keycloak/abstract.keycloak.service';
import { Subscription } from 'rxjs';
import { KeycloakTokenParsed } from './type/keycloak';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MessageService } from './services/message/message.service';
import { SettingsService } from './services/settings/settings.service';
import { Title } from '@angular/platform-browser';
import { AbstractSubscriptionDestroyer } from './shared/abstract.subscription.destroyer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends AbstractSubscriptionDestroyer implements OnInit {

  constructor(private settingsService: SettingsService, private titleService: Title) {
    super();
  }

  ngOnInit(): void {

    this.markForUnsubscription(
      this.settingsService.title$.subscribe(title => {
        this.titleService.setTitle(title);
      })
    );
  }
}
