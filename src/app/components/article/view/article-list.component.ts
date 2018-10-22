import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../api/article';
import { AbstractKeycloakService } from '../../../services/keycloak/abstract.keycloak.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  @Input() title: string;
  @Input() articles: Array<Article>;
  @Input() canEditArticles: boolean;
  
  canPublishArticles: boolean;

  constructor(private keycloakService: AbstractKeycloakService) { 
    this.canPublishArticles = keycloakService.canPublishArticles();
  }

  ngOnInit() {
    console.log('ARTICLES ARRAY IS: ', this.articles);
  }





}
