import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageListComponent } from './page-list/page-list.component';
import { PageEditComponent } from './page-edit/page-edit.component';
import { AuthGuard } from '../auth/auth.guard';
import { PageCreateComponent } from './page-create/page-create.component';
import { PageResolveService } from '../services/page/page-resolve.service';
import { PageCollectionResolveService } from '../services/page/page-collection-resolve.service';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: PageListComponent, resolve: { pageCollection: PageCollectionResolveService }},
  { path: 'edit/:id', component: PageEditComponent, canActivate: [AuthGuard], resolve: {page: PageResolveService}},
  { path: 'create', component: PageCreateComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageManagementRoutingModule { }
