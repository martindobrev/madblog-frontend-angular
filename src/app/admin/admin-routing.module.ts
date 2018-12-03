import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnpublishedArticlesComponent } from '../components/article/view/unpublished-articles.component';
import { UsersComponent } from './users/users.component';
import { ArticlesComponent } from './articles/articles.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
  }, {
    path: '', children: [
      {
        path: 'users', component: UsersComponent
      },
      {
        path: 'articles', component: ArticlesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
