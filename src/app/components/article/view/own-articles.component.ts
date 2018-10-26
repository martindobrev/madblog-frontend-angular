import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../api/article';

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
      if (data.articles) {
        this.ownArticles = data.articles.own;
      }
    });
  }
}
