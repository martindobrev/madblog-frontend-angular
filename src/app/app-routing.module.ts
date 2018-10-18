import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleResolveService } from './services/article/article-resolve.service';
import { ArticleCollectionResolveService } from './services/article/article-collection-resolve.service';
import { ArticleViewComponent } from './components/article/view/article-view.component';
import { ArticleEditComponent } from './components/article/edit/article-edit.component';
import { ArticleCreateComponent } from './components/article/create/article-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { articles: ArticleCollectionResolveService }},
  { path: 'article/:id', component: ArticleViewComponent, resolve: {articleAndUserArray: ArticleResolveService}},
  { path: 'edit/article/:id', component: ArticleEditComponent, resolve: {articleAndUserArray: ArticleResolveService}},
  { path: 'create/article', component: ArticleCreateComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
