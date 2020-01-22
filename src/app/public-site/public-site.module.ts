import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicSiteRoutingModule } from './public-site-routing.module';
import { HomeComponent } from './home/home.component';
import { ArticleViewComponent } from './article/view/article-view.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { Error404Component } from './error404/error404.component';
import { PageViewComponent } from './page-view/page-view.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedModule } from '../shared/shared.module';
import {MainPipe} from '../main-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    PublicSiteRoutingModule,
    FormsModule,
    SharedModule,
    MainPipe

  ],
  declarations: [
    Error404Component,
    MainComponent,
    HomeComponent,
    ArticleViewComponent,
    PageViewComponent,
    ServerErrorComponent,
    LogoutComponent,
  ]
})
export class PublicSiteModule { }
