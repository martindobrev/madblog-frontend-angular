import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SnippetListComponent } from './snippet-list/snippet-list.component';
import { SnippetCreateComponent } from './snippet-create/snippet-create.component';
import { SnippetCollectionResolveService } from './snippet-collection-resolve.service';
import { SnippetEditComponent } from './snippet-edit/snippet-edit.component';
import { SnippetResolveService } from './snippet-resolve.service';

const routes: Routes = [
  { path: '', component: SnippetListComponent, resolve: { snippetCollection: SnippetCollectionResolveService }},
  { path: 'edit/:name', component: SnippetEditComponent, resolve: {snippet: SnippetResolveService}},
  { path: 'create', component: SnippetCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnippetManagementRoutingModule { }
