import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article/article.service';
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

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.articles = data.articles;
      console.log(this.articles);
      this.featuredArticle = this.getFeaturedArticle(this.articles)
      console.log(this.featuredArticle);
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
