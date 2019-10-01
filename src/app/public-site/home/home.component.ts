import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleCollection, Article } from '../../api/article';
import { ActivatedRoute, Router } from '@angular/router';
import { StringUtils } from '../../util/string-utils';
import { ArticlePage } from '../../api/article-page';
import { Subscription } from 'rxjs';
import { AbstractArticleService } from './../../services/article/abstract.article.service';

declare var UIkit: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy  {

  articlePage: ArticlePage;
  featuredArticle: Article;

  subscriptions: Array<Subscription> = [];

  constructor(private activatedRoute: ActivatedRoute, private articleService: AbstractArticleService) {}

  ngOnInit() {
    console.log('HOME Component created!');
    this.activatedRoute.data.subscribe(data => {
      this.articlePage = data.articlePage;
    });

    this.subscriptions.push(this.articleService.getRandomFeaturedArticle().subscribe(article => {
      this.featuredArticle = article;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  calculateArticleReadTime(article: Article) {
    return StringUtils.countMinutesToRead(article.content);
  }

  loadPage(page: number) {
    this.articleService.getArticlePage(page).subscribe(articlePage => {
      this.articlePage = articlePage;
    });
  }

  scroll(el: HTMLElement) {
    UIkit.scroll(el).scrollTo(el);
  }
}
