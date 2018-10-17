import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleResolveService } from './article-resolve.service';
import { ArticleCollectionResolveService } from './article-collection-resolve.service';
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleCreateComponent } from './article-create/article-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { articles: ArticleCollectionResolveService }},
  { path: 'article/:id', component: ArticleViewComponent, resolve: {article: ArticleResolveService}},
  { path: 'edit/article/:id', component: ArticleEditComponent, resolve: {article: ArticleResolveService}},
  { path: 'create/article', component: ArticleCreateComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
