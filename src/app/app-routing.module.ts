import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleResolveService } from './services/article/article-resolve.service';
import { ArticleCollectionResolveService } from './services/article/article-collection-resolve.service';
import { ArticleViewComponent } from './components/article/view/article-view.component';
import { ArticleEditComponent } from './components/article/edit/article-edit.component';
import { ArticleCreateComponent } from './components/article/create/article-create.component';
import { OwnArticlesComponent } from './components/article/view/own-articles.component';
import { UnpublishedArticlesComponent } from './components/article/view/unpublished-articles.component';
import { FileManagerComponent } from './components/file/file-manager.component';
import { BlogFileCollectionResolveService } from './services/file/blog-file-collection-resolve.service';
import { AuthGuard } from './auth/auth.guard';
import { CanViewArticleGuard } from './auth/can-view-article.guard';
import { OwnArticleCollectionResolveService } from './services/article/own-article-collection-resolve.service';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { articles: ArticleCollectionResolveService }},
  { path: 'article/:id', component: ArticleViewComponent, resolve: {article: ArticleResolveService}},
  { path: 'edit/article/:id', component: ArticleEditComponent, canActivate: [AuthGuard], resolve: {article: ArticleResolveService}},
  { path: 'create/article', component: ArticleCreateComponent },
  { path: 'administer-articles', component: OwnArticlesComponent, canActivate: [AuthGuard], resolve: { articles: OwnArticleCollectionResolveService }},
  { path: 'file-manager', component: FileManagerComponent, canActivate: [AuthGuard], resolve: { blogFileCollection: BlogFileCollectionResolveService } },
  { path: 'error404', component: Error404Component },
  { path: '**', component: Error404Component }

];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})]
})
export class AppRoutingModule { }
