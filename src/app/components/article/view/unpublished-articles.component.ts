import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../api/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unpublished-articles',
  templateUrl: './unpublished-articles.component.html',
  styleUrls: ['./unpublished-articles.component.css']
})
export class UnpublishedArticlesComponent implements OnInit {

  unpublishedArticles: Array<Article>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      if (data.articles) {
        this.unpublishedArticles = data.articles.unpublished;
        console.log('UNPUBLISHED ON SERVER IS:', this.unpublishedArticles);
      }
    });
  }
}