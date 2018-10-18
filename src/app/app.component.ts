import { Component, OnInit } from '@angular/core';
import { ArticleService } from './services/article/article.service';
import { Article, ArticleCollection } from './api/article';
import { KeycloakService } from './services/keycloak/keycloak.service';
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
  
  private subscriptions: Array<Subscription> = [];

  constructor(private articleService: ArticleService, private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.subscriptions.push(
    this.keycloakService.getKeycloakTokenParsed$().subscribe((profile) => {
      this.profile = profile;
      console.log('USER PROFILE', this.profile);
    })
    );

    this.canUserCreateArticles = this.keycloakService.canUserCreateArticles();
  }


  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }

  


}
