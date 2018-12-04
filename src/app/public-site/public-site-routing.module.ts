import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleCollectionResolveService } from '../services/article/article-collection-resolve.service';
import { ArticleViewComponent } from './article/view/article-view.component';
import { ArticleResolveService } from '../services/article/article-resolve.service';
import { ArticleEditComponent } from './article/edit/article-edit.component';
import { AuthGuard } from '../auth/auth.guard';
import { ArticleCreateComponent } from './article/create/article-create.component';
import { OwnArticlesComponent } from './article/view/own-articles.component';
import { OwnArticleCollectionResolveService } from '../services/article/own-article-collection-resolve.service';
import { FileManagerComponent } from '../components/file/file-manager.component';
import { BlogFileCollectionResolveService } from '../services/file/blog-file-collection-resolve.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, resolve: { articles: ArticleCollectionResolveService }},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'article/:id', component: ArticleViewComponent, resolve: {article: ArticleResolveService}},
  { path: 'edit/article/:id', component: ArticleEditComponent, canActivate: [AuthGuard], resolve: {article: ArticleResolveService}},
  { path: 'create/article', component: ArticleCreateComponent },
  { path: 'administer-articles', component: OwnArticlesComponent, canActivate: [AuthGuard], resolve: { articles: OwnArticleCollectionResolveService }},
  { path: 'file-manager', component: FileManagerComponent, canActivate: [AuthGuard], resolve: { blogFileCollection: BlogFileCollectionResolveService }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicSiteRoutingModule { }
