import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { GlobalStatsComponent } from './global-stats/global-stats.component';
import { FileManagerComponent } from './file/file-manager.component';
import { BlogFileCollectionResolveService } from '../services/file/blog-file-collection-resolve.service';
import { UserResolveService } from '../services/user/user-resolve.service';
import { AccessGuard } from './access.guard';
import { SnippetResolveService } from '../shared/snippet/snippet-resolve.service';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canLoad: [AccessGuard], resolve: { userData: UserResolveService },
    children: [
        {
          path: '', canLoad: [AccessGuard], component: GlobalStatsComponent
        },

        {
          path: 'users', canLoad: [AccessGuard], component: UsersComponent
        },
        {
          path: 'articles', canLoad: [AccessGuard], loadChildren: './../article-management/article-management.module#ArticleManagementModule',
        },
        {
          path: 'pages', canLoad: [AccessGuard], loadChildren: './../page-management/page-management.module#PageManagementModule',
        },
        {
          path: 'file-manager', canLoad: [AccessGuard], component: FileManagerComponent, resolve: { blogFileCollection: BlogFileCollectionResolveService}
        },
        {
          path: 'snippets', loadChildren: './../snippet-management/snippet-management.module#SnippetManagementModule'
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
