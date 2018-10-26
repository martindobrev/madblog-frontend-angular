import { Component, OnInit } from '@angular/core';
import { BlogFile } from './../../api/blog-file';
import { ActivatedRoute } from '@angular/router';
import { AbstractFileService } from './../../services/file/abstract.file.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  blogFiles: Array<BlogFile>;
  selectedIndex: number;
  constructor(private activatedRoute: ActivatedRoute, private fileService: AbstractFileService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.blogFiles = data.blogFileCollection.blogFiles;
    });

    this.fileService.getFileUploaded$().subscribe(newFile => {
      this.blogFiles.push(newFile);
    });
  }
}
