import { Component, OnInit } from '@angular/core';
import { ArticleCollection, Article } from '../api/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: ArticleCollection;
  featuredArticle: Article;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.articles = data.articles;
      this.featuredArticle = this.getFeaturedArticle(this.articles)
    });
  }

  private getFeaturedArticle(articleCollection: ArticleCollection): Article {
    if (!articleCollection) {
      return null;
    }

    if (!articleCollection.featured) {
      return null;
    }

    return articleCollection.featured[0];
  }
}
