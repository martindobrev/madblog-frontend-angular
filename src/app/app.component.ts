import { Component, OnInit } from '@angular/core';
import { AbstractArticleService } from './services/article/abstract.article.service';
import { Article, ArticleCollection } from './api/article';
import { AbstractKeycloakService } from './services/keycloak/abstract.keycloak.service';
import { Subscription } from 'rxjs';
import { KeycloakProfile, KeycloakTokenParsed } from './type/keycloak';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { MessageService } from './services/message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'app';

  username: string = null;
  profile: KeycloakTokenParsed = null;
  
  canUserCreateArticles: boolean = false;
  showOwnArticles: boolean = false;
  canUserPublishArticles: boolean = false;
  currentUrl: string;
  
  private subscriptions: Array<Subscription> = [];

  constructor(private articleService: AbstractArticleService, 
    private keycloakService: AbstractKeycloakService, 
    private router: Router,
    private messageService: MessageService) {}

  ngOnInit(): void {
    console.log('APP COMPONENT CREATED');
    this.subscriptions.push(
      this.router.events.subscribe((event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.url;
        }
      })
    );
    this.subscriptions.push(
    this.keycloakService.getKeycloakTokenParsed$().subscribe((profile) => {
      this.profile = profile;
      console.log('USER PROFILE', this.profile);
      
    })
    );

    this.subscriptions.push(
      this.messageService.messages$.subscribe(msg => {
        window.alert(msg);

      })
    );
    this.canUserCreateArticles = this.keycloakService.canCreateArticles();
    this.showOwnArticles = this.canUserCreateArticles;
    this.canUserPublishArticles = this.keycloakService.canPublishArticles();
  }


  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }

  


}
