import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LogoutGuard } from './auth/logout.guard';
import { SnippetResolveService } from './shared/snippet/snippet-resolve.service';

const routes: Routes = [
  {
    path: 'admin',
    //canActivate: [AuthGuard],
    loadChildren: './admin/admin.module#AdminModule',
  },
  {
    path: 'logout',
    canLoad: [LogoutGuard],
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})]
})
export class AppRoutingModule { }
