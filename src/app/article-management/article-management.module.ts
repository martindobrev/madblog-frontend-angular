import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleManagementRoutingModule } from './article-management-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ArticleManagementRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ArticleListComponent, ArticleEditComponent, ArticleCreateComponent]
})
export class ArticleManagementModule { }
