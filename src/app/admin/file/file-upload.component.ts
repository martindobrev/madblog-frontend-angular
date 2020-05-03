import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { AbstractFileService } from './../../../app/services/file/abstract.file.service';
import { Subscription } from 'rxjs';
import { BlogFile } from './../../../app/api/blog-file';
import { FileUploadProgress, FileUploadError } from './../../http/file-upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit, OnDestroy {

  selectedFiles: Array<File>;
  filesBeingUploaded = {};

  progressSubscription: Subscription;
  successSubscription: Subscription;
  errorSubscription: Subscription;

  @ViewChild('file',  {static: false}) file;

  constructor(private fileService: AbstractFileService) { }

  ngOnInit() {
    //this.addSubscriptions();
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  uploadFile(file: File) {
    this.filesBeingUploaded[file.name] = {
      size: 100,
      progress: 0,
      completed: false,
      error: null
    };
    this.fileService.uploadFile(file);
  }

  clearAll() {
    console.log('CLEAR ALL');
    this.selectedFiles = null;
    this.filesBeingUploaded = {};
    this.removeSubscriptions();
  }

  uploadAll() {
    this.addSubscriptions();
    this.selectedFiles.forEach(file => {
      console.log('UPLOADING FILE: ', file);

      if (!this.fileIsBeingUploaded(file)) {
        this.uploadFile(file);
      }
    });
  }

  onDrop(event) {
    this.selectedFiles = this.fileListToArray(event.dataTransfer.files);
    console.log('ON DROP')
    this.uploadAll();
    event.preventDefault();
  }
  
  private fileListToArray(fileList: FileList): Array<File> {
    const fileArray = new Array();
    for (let i = 0; i < fileList.length; i++) {
      fileArray.push(fileList.item(i));
    }
    console.log('TO RETURN: ', fileArray);
    return fileArray;
  }

  private fileIsBeingUploaded(file: File): boolean {
    return !!this.filesBeingUploaded[file.name];
  }

  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  fileAdded(event) {
    alert('FILE ADDED');
    // console.log('EVENT IS: ', event);
    if (event.target.files) {
      //this.file.nativeElement.value = '';
      
      this.selectedFiles = this.fileListToArray(event.target.files)
      this.uploadAll();
    }
  }

  private addSubscriptions() {
    this.progressSubscription = this.fileService.getFileUploadProgress$().subscribe((fileProgress: FileUploadProgress) => {
      this.filesBeingUploaded[fileProgress.file.name].progress = Math.round(fileProgress.percentLoaded * 100);
    });

    this.successSubscription = this.fileService.getFileUploaded$().subscribe((file: BlogFile) => {
      this.filesBeingUploaded[file.name].completed = true;
    });

    this.errorSubscription = this.fileService.getFileUploadError$().subscribe((error: FileUploadError ) => {
      this.filesBeingUploaded[error.file.name].error = error;
    });
  }

  private removeSubscriptions() {
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }

    if (this.successSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }
}