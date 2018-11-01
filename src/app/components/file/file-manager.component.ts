import { Component, OnInit, Input } from '@angular/core';
import { BlogFile, BlogFileCollection } from './../../api/blog-file';
import { ActivatedRoute } from '@angular/router';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  blogFiles: Array<BlogFile>;
  selectedIndex: number;
  subscriptions: Array<Subscription> = [];
  constructor(private activatedRoute: ActivatedRoute, private fileService: AbstractFileService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.data.subscribe(data => {
        if (data.blogFileCollection) {
          this.blogFiles = data.blogFileCollection.blogFiles;
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
}
