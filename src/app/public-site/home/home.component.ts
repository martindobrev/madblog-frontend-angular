import { Component, OnInit } from '@angular/core';
import { ArticleCollection, Article } from '../../api/article';
import { ActivatedRoute, Router } from '@angular/router';
import { StringUtils } from '../../util/string-utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articleCollection: ArticleCollection;
  featuredArticle: Article;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log('HOME Component created!');
    this.activatedRoute.data.subscribe(data => {
      this.articleCollection = data.articles;
      this.featuredArticle = this.getFeaturedArticle(this.articleCollection)
    });
  }

  calculateArticleReadTime(article: Article) {
    return StringUtils.countMinutesToRead(article.content);
  }

  private getFeaturedArticle(articleCollection: ArticleCollection): Article {
    if (!articleCollection) {
      return null;
    }

    if (!articleCollection.articles) {
      return null;
    }

    const featuredArticleIndexes = [];

    articleCollection.articles.forEach((article: Article, index: number) => {
      if (article.featured) {
        featuredArticleIndexes.push(index);
      }
    });
    
    if (featuredArticleIndexes) {
      const randomIndex = Math.floor(Math.random() * featuredArticleIndexes.length);
      return articleCollection.articles.splice(featuredArticleIndexes[randomIndex], 1)[0];
    }

    return null;
  }
}
