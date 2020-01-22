import { ArticlePage } from './../../api/article-page';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleCollection, Article } from '../../api/article';
import { ActivatedRoute, Router } from '@angular/router';
import { StringUtils } from '../../util/string-utils';
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
  searchedName = '';
  currentPage = 0;
  filter: any;

  constructor(private activatedRoute: ActivatedRoute, private articleService: AbstractArticleService) {}

  ngOnInit() {
    console.log('HOME Component created!');
    this.activatedRoute.data.subscribe(data => {
      this.articlePage = data.articlePage;
      this.currentPage = data.articlePage.pageNumber;
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
    this.articleService.getArticlePage(page, this.searchedName).subscribe(articlePage => {
      this.articlePage = articlePage;
      this.scroll();
    });
  }

  scroll() {
    UIkit.scroll().scrollTo(document.getElementById('pagination'), {offset: 200});
  }

  searchNameChanged(name: string) {
    console.log(name);
    this.filter = name;
    console.log(this.filter);
    this.searchedName = name;
    this.loadPage(this.currentPage);
    
  }

}
