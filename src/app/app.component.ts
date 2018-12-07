import { Component, OnInit } from '@angular/core';
import { AbstractArticleService } from './services/article/abstract.article.service';
import { AbstractKeycloakService } from './services/keycloak/abstract.keycloak.service';
import { Subscription } from 'rxjs';
import { KeycloakTokenParsed } from './type/keycloak';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MessageService } from './services/message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
    console.log('APP COMPONENT CREATED');
  }
}
