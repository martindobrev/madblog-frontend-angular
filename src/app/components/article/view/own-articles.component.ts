import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, ArticleCollection } from '../../../api/article';
import { AbstractKeycloakService } from './../../../services/keycloak/abstract.keycloak.service';
import { KeycloakTokenParsed } from './../../../type/keycloak';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-own-articles',
  templateUrl: './own-articles.component.html',
  styleUrls: ['./own-articles.component.css']
})
export class OwnArticlesComponent implements OnInit {

  ownArticles: Array<Article>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      const articleCollection = data.articles as ArticleCollection;
      this.ownArticles = articleCollection.articles;
    });
  }
}
