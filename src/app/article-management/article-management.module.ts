import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleManagementRoutingModule } from './article-management-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ArticleCreateReactiveComponent } from './article-create-reactive/article-create-reactive.component';

@NgModule({
  imports: [
    CommonModule,
    ArticleManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ArticleListComponent, ArticleEditComponent, ArticleCreateComponent, ArticleCreateReactiveComponent]
})
export class ArticleManagementModule { }
