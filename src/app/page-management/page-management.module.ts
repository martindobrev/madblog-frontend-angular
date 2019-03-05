import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageManagementRoutingModule } from './page-management-routing.module';
import { PageCreateComponent } from './page-create/page-create.component';
import { PageEditComponent } from './page-edit/page-edit.component';
import { PageListComponent } from './page-list/page-list.component';
import { FormsModule } from '@angular/forms';
import { ArticleManagementModule } from '../article-management/article-management.module';
import { HtmlEditorComponent } from './html-editor/html-editor.component';

@NgModule({
  imports: [
    CommonModule,
    PageManagementRoutingModule,
    FormsModule
  ],
  declarations: [PageCreateComponent, PageEditComponent, PageListComponent, HtmlEditorComponent]
})
export class PageManagementModule { }
