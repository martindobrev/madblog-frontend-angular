import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnippetManagementRoutingModule } from './snippet-management-routing.module';
import { SnippetCreateComponent } from './snippet-create/snippet-create.component';
import { SnippetEditComponent } from './snippet-edit/snippet-edit.component';
import { SnippetListComponent } from './snippet-list/snippet-list.component';
import { FormsModule } from '@angular/forms';
import { PageManagementModule } from '../page-management/page-management.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SnippetCreateComponent,
    SnippetEditComponent,
    SnippetListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SnippetManagementRoutingModule,
    PageManagementModule,
  ]
})
export class SnippetManagementModule { }
