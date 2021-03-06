import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BlogFile, BlogFileCollection, BlogFilePage } from './../../api/blog-file';
import { ActivatedRoute } from '@angular/router';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit , OnDestroy {

  @Input() selectable = false;

  blogFiles: Array<BlogFile>;
  id: string;
  subscriptions: Array<Subscription> = [];
  currentPage = 0;
  totalPages = 0;
  searchedName = '';

  constructor(private activatedRoute: ActivatedRoute, private fileService: AbstractFileService) { }

  ngOnInit() {
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
          console.log('AFTER DELETE', this.blogFiles);
        }
      }
    });
  }

  loadPage(pageNumber: number) {
    const s = this.fileService.getFilePage(pageNumber, this.searchedName).subscribe((blogFilePage: BlogFilePage) => {
      if (blogFilePage) {
        this.blogFiles = blogFilePage.blogFiles;
        this.currentPage = blogFilePage.pageNumber;
        this.totalPages = blogFilePage.totalPages;
      }

      s.unsubscribe();
    });
  }

  searchNameChanged(name: string) {
    this.searchedName = name;
    this.loadPage(this.currentPage);
  }
}
