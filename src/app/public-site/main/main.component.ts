import { Component, OnInit } from '@angular/core';
import { AbstractArticleService } from './../../services/article/abstract.article.service';
import { Article, ArticleCollection } from './../../api/article';
import { AbstractKeycloakService } from './../../services/keycloak/abstract.keycloak.service';
import { Subscription } from 'rxjs';
import { KeycloakProfile, KeycloakTokenParsed } from './../../type/keycloak';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { MessageService } from './../../services/message/message.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  
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
    console.log('MAIN COMPONENT CREATED!');
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
