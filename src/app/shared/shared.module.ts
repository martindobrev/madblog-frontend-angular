import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnippetService } from './snippet/snippet.service';
import { SnippetResolveService } from './snippet/snippet-resolve.service';
import { SnippetCollectionResolveService } from './snippet/snippet-collection-resolve.service';
import { HtmlEditorComponent } from './html-editor/html-editor.component';
import { RouterModule } from '@angular/router';
import { MaddobLibModule } from 'maddob-lib';
import { PaginationComponent } from './article-pagination/pagination.component';

@NgModule({
  declarations: [HtmlEditorComponent, PaginationComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaddobLibModule
  ],
  providers: [
    SnippetService,
    SnippetResolveService,
    SnippetCollectionResolveService
  ],
  exports: [HtmlEditorComponent, PaginationComponent]
})
export class SharedModule { }
