import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleViewComponent } from '../public-site/article/view/article-view.component';
import { ArticleResolveService } from '../services/article/article-resolve.service';
import { AuthGuard } from '../auth/auth.guard';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { OwnArticleCollectionResolveService } from '../services/article/own-article-collection-resolve.service';

const routes: Routes = [
  { path: '', component: ArticleListComponent, resolve: {articleCollection: OwnArticleCollectionResolveService}},
/*  { path: 'view/:id', component: ArticleViewComponent, resolve: {article: ArticleResolveService}}, */
  { path: 'edit/:id', component: ArticleEditComponent, canActivate: [AuthGuard], resolve: {article: ArticleResolveService}},
  { path: 'create', component: ArticleCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleManagementRoutingModule { }
