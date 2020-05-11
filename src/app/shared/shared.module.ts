import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnippetService } from './snippet/snippet.service';
import { SnippetResolveService } from './snippet/snippet-resolve.service';
import { SnippetCollectionResolveService } from './snippet/snippet-collection-resolve.service';
import { HtmlEditorComponent } from './html-editor/html-editor.component';
import { RouterModule } from '@angular/router';
import { MaddobLibModule } from 'maddob-lib';
import { PaginationComponent } from './article-pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@NgModule({
  declarations: [HtmlEditorComponent, PaginationComponent, SearchComponent, FileSelectorComponent],
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
  exports: [HtmlEditorComponent, PaginationComponent, SearchComponent, FileSelectorComponent]
})
export class SharedModule { }
