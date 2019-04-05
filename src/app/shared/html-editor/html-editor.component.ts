import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, forwardRef, Attribute, ViewRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { BlogFile } from './../../api/blog-file';
import { MarkdownEditorComponent, UikitMarkdownEditorComponent } from 'maddob-lib';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HtmlEditorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => HtmlEditorComponent),
      multi: true
    }
  ]
})
export class HtmlEditorComponent extends UikitMarkdownEditorComponent {


  constructor(
    @Attribute('required') required: boolean = false, 
    @Attribute('maxlength') maxlength: number = -1, 
    private fileService: AbstractFileService) {
    super(required, maxlength);
  }

  ngOnInit() {
    super.ngOnInit();

    this.fileService.getFileSelected$().subscribe((value : {id: string, file: BlogFile}) => {
      if (value.id === 'pageEditor') {
        this.insertContent('image', `/api/v1/files/${value.file.id}`);
        this.fileService.hideFileManager('pageEditor');
      }
    });
  }

  chooseImage() {
    this.fileService.showFileManager('pageEditor');
  }

 
}