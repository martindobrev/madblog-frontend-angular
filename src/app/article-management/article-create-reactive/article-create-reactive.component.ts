import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractFileService } from './../../services/file/abstract.file.service';

@Component({
  selector: 'app-article-create-reactive',
  templateUrl: './article-create-reactive.component.html',
  styleUrls: ['./article-create-reactive.component.css']
})
export class ArticleCreateReactiveComponent implements OnInit {

  articleFormGroup = new FormGroup({
    'title': new FormControl(null, Validators.required),
    'subtitle': new FormControl(null, Validators.required),
    'content': new FormControl(null, Validators.required),
    'background-image': new FormControl(null),
    'published': new FormControl(true),
    'featured': new FormControl(false)
  });

  constructor(private fileService: AbstractFileService) { }

  ngOnInit(): void {
  }


  openFileManager() {
    this.fileService.showFileManager('BACKGROUND');
  }

  onSubmit() {
    console.log('save the article here...');
  }
}
