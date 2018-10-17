import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { Article, ArticleCollection } from './api/article';
import { KeycloakService } from './keycloak.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'app';

  username: string = null;
  profile: any = null;
  displayNavigation: boolean = false;

  canUserCreateArticles: boolean = false;

  private subscriptions: Array<Subscription> = [];

  constructor(private articleService: ArticleService, private keycloakService: KeycloakService) {}

  ngOnInit(): void {

    //this.user = this.keycloakService.getToken();

    this.subscriptions.push(
    this.keycloakService.profile$.subscribe((profile) => {
      this.profile = profile;
      console.log('USER PROFILE', this.profile);
      this.displayNavigation = !!profile;
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
