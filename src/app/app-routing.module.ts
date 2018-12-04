import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
  },
  { path: 'error404', component: Error404Component },
  { path: '**', component: Error404Component }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', enableTracing: true})]
})
export class AppRoutingModule { }
