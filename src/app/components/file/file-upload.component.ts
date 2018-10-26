import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AbstractFileService } from './../../../app/services/file/abstract.file.service';
import { Subject } from 'rxjs';
import { BlogFile } from './../../../app/api/blog-file';

declare var ElasticProgress: any;


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit, AfterViewInit {

  private progress: any;

  ngAfterViewInit(): void {
  
    var element=document.querySelector('.Upload');
    this.progress = new ElasticProgress(element, {
      arrowDirection: 'up',
      background: 'red',
      buttonSize: 50,
      colorBg: 'red',
      colorFg: 'pink',
    //var progress = new ElasticProgress('.Upload', {
      // ...
      onClick: () => {

        this.progress.open();
        this.uploadFile();
      },

      onClose: () => {
        this.file.nativeElement.value = '';
        this.selectedFile = null;
      },

      onFail: () => {
        console.log('ON FAIL');
      }
    });



    function theFunctionYouAreUsingToCheckProgress() {
      // ...
      //progress.setValue(value);
    }
  }

  selectedFile: File;

  private fileUploaded: Subject<BlogFile> = new Subject();
  fileUploaded$ = this.fileUploaded.asObservable();

  @ViewChild('file') file;

  constructor(private fileService: AbstractFileService) { }

  ngOnInit() {

    this.fileService.getFileUploadProgress$().subscribe(fileUploadProgress => {
      if (this.progress) {
        this.progress.setValue(fileUploadProgress);
      }
    });

    this.fileService.getFileUploaded$().subscribe(file => {
      if (this.progress) {
        this.progress.close();
        this.selectedFile = null;
      }
    });

    this.fileService.getFileUploadError$().subscribe(error => {
      this.progress.fail();
      console.error('FILE UPLOAD ERROR: ' + error.message);
    });

  }
  onFileAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    if (this.file.nativeElement.files) {
      this.selectedFile = this.file.nativeElement.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  uploadFile() {
    this.fileService.uploadFile(this.selectedFile);
  }

  resetFile() {
    if (this.progress) {
      this.progress.close();
    }

    this.file.value = '';
    this.selectedFile = null;
  }
}