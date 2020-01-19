import { SearchBarComponent } from './search-bar/search-bar.component';
import { PaginationComponent } from './../../shared/article-pagination/pagination.component';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BlogFile, BlogFileCollection, BlogFilePage } from './../../api/blog-file';
import { ActivatedRoute } from '@angular/router';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { Subscription } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit , OnDestroy {

  @Input() public selectable = false;

  @ViewChild(SearchBarComponent, {static: true})
  public searchChild: SearchBarComponent;
  blogFiles: Array<BlogFile>;
  id: string;
  subscriptions: Array<Subscription> = [];
  currentPage = 0;
  totalPages = 0;
  idToDelete: number;
  timer: number;

  constructor(private activatedRoute: ActivatedRoute, private fileService: AbstractFileService) { }

  ngOnInit() {

    this.searchChild.onTextInserted
    .subscribe(textWord => {
      this.fileService.getSearchedFile(textWord)
      .pipe(
        filter(res => {
          return res && res.length > 0;
        })
      ).subscribe(foundBlogFiles => {
        this.blogFiles = foundBlogFiles;
      }
      );

    });

    this.subscriptions.push(
      this.activatedRoute.data.subscribe(data => {
        if (data.blogPage) {
          this.blogFiles = data.blogPage.blogFiles;
          this.currentPage = data.blogPage.pageNumber;
          this.totalPages = data.blogPage.totalPages;
        }
      })
    );

    if (this.blogFiles === null || this.blogFiles === undefined) {
      this.subscriptions.push(
        this.fileService.getFiles().subscribe((blogFilesCollection: BlogFileCollection) => {
          this.blogFiles = blogFilesCollection.blogFiles;
        }
      ));
    }

    this.fileService.getFileUploaded$().subscribe(newFile => {
      this.blogFiles.unshift(newFile);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  selectItem(file: BlogFile) {
    this.fileService.selectFile(this.id, file);
  }

  onTrashClick(id: string) {
    this.idToDelete = +id;
    this.timer = window.setTimeout(() => {
      this.disableTimer();
    }, 2000);
  }

  private disableTimer() {
    this.idToDelete = null;
    window.clearTimeout(this.timer);
    this.timer = null;
  }

  deleteFile(file: BlogFile) {
    this.fileService.deleteFile(file).subscribe(status => {
      if (status) {
        console.log('FILE DELETED', file);
        let indexToDelete = -1;
        this.blogFiles.find((value: BlogFile, index: number) => {
          if (value.id === file.id) {
            indexToDelete = index;
            return true;
          }
          return false;
        });

        if (indexToDelete > -1) {
          console.log('BEFORE DELETE', this.blogFiles);
          this.blogFiles.splice(indexToDelete, 1);
          this.totalPages = this.blogFiles.length;
          console.log('AFTER DELETE', this.blogFiles);
        }
      }
    });
  }

  loadPage(pageNumber: number) {
    const s = this.fileService.getFilePage(pageNumber).subscribe((blogFilePage: BlogFilePage) => {
      if (blogFilePage) {
        this.blogFiles = blogFilePage.blogFiles;
        this.currentPage = blogFilePage.pageNumber;
        this.totalPages = blogFilePage.totalPages;
      }

      s.unsubscribe();
    });
  }



}
