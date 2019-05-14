import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActuatorService } from '../actuator/actuator.service';
import { Observable, Subscription } from 'rxjs';
import { ArticleInfo } from '../../api/article-info';
import { AbstractArticleService } from './../../services/article/abstract.article.service';
import { PageInfo } from '../../api/page-info';
import { MenuService } from './../../services/page/menu.service';
import { AbstractKeycloakService } from './../../services/keycloak/abstract.keycloak.service';

@Component({
  selector: 'app-global-stats',
  templateUrl: './global-stats.component.html',
  styleUrls: ['./global-stats.component.css']
})
export class GlobalStatsComponent implements OnInit, OnDestroy {

  totalRequests: number;
  totalTimeSeconds: number;
  totalArticles: number;
  totalPages: number;

  memoryUsed: Observable<any>;
  totalMemory: Observable<any>;
  uptime: Observable<any>;
  articleInfo: ArticleInfo;
  pageInfo: PageInfo;
  isAdmin: boolean;

  subscriptions: Array<Subscription> = [];

  constructor(private actuatorService: ActuatorService, 
    private articleService: AbstractArticleService,
    private menuService: MenuService, private keycloakService: AbstractKeycloakService) { }

  ngOnInit() {
    

    this.subscriptions.push(
      this.articleService.getArticleInfo().subscribe(articleInfo => {
        this.articleInfo = articleInfo;
      })
    );

    this.subscriptions.push(
      this.menuService.getPageInfo().subscribe(pageInfo => {
        this.pageInfo = pageInfo;
      })
    );
    
    this.isAdmin = this.keycloakService.isAdmin();
    if (this.isAdmin) {
      this.subscriptions.push(
        this.actuatorService.getTotalApiRequests().subscribe(jsonData => {
          this.totalRequests = jsonData.measurements[0].value;
          this.totalTimeSeconds = jsonData.measurements[1].value;
        })
      );
  
      this.memoryUsed = this.actuatorService.getMemoryUsed();
      this.totalMemory = this.actuatorService.getTotalMemory();
      this.uptime = this.actuatorService.getUptime();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
