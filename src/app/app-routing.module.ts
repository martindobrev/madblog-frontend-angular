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

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { articles: ArticleCollectionResolveService }},
  { path: 'article/:id', component: ArticleViewComponent, resolve: {articleAndUserArray: ArticleResolveService}},
  { path: 'edit/article/:id', component: ArticleEditComponent, resolve: {articleAndUserArray: ArticleResolveService}},
  { path: 'create/article', component: ArticleCreateComponent },
  { path: 'own-articles', component: OwnArticlesComponent, resolve: { articles: ArticleCollectionResolveService }},
  { path: 'unpublished', component: UnpublishedArticlesComponent, resolve: { articles: ArticleCollectionResolveService }},
  { path: 'file-manager', component: FileManagerComponent, resolve: { blogFileCollection: BlogFileCollectionResolveService } }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
