import { Component, OnInit } from '@angular/core';
import { AbstractArticleService } from './services/article/abstract.article.service';
import { Article, ArticleCollection } from './api/article';
import { AbstractKeycloakService } from './services/keycloak/abstract.keycloak.service';
import { Subscription } from 'rxjs';
import { KeycloakProfile, KeycloakTokenParsed } from './type/keycloak';

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
  
  private subscriptions: Array<Subscription> = [];

  constructor(private articleService: AbstractArticleService, private keycloakService: AbstractKeycloakService) {}

  ngOnInit(): void {
    console.log('APP COMPONENT CREATED');
    this.subscriptions.push(
    this.keycloakService.getKeycloakTokenParsed$().subscribe((profile) => {
      this.profile = profile;
      console.log('USER PROFILE', this.profile);
      
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
