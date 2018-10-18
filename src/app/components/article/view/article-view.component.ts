import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../api/article';
import { User } from '../../../api/user';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

  article: Article;
  author: User;

  constructor(private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.data.subscribe(data => {
      this.article = data.articleAndUserArray[0];
      this.author = data.articleAndUserArray[1];
    });
  }

  ngOnInit() {
  }

}
