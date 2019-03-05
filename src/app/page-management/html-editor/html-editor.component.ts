import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, forwardRef, Attribute, ViewRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { BlogFile } from './../../api/blog-file';
import { ElementFinder } from 'protractor';

declare var CodeMirror: any;
declare var UIkit: any;


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
export class HtmlEditorComponent implements OnInit, AfterViewInit, ControlValueAccessor, Validator {
  
  private _value: string;

  @ViewChild("codeMirrorContainer") codeMirrorContainer: ElementRef; 

  previewEnabled = true;
  fullscreenEnabled = false;

  codeEditorDivClasses = {
    'uk-width-1-2': this.previewEnabled,
    'uk-width-expand': !this.previewEnabled,
  };

  previewDivClasses = {
    'uk-width-1-2': this.previewEnabled,
    'hidden': !this.previewEnabled,
  }

  get value(): string {
    return this._value || '';
  }

  set value(value: string) {
    this._value = value;
    this._onChange(value);
  }
  
  _onChange = (_: any) => { };
  _onTouched = () => { };

  validate(c: AbstractControl): ValidationErrors {
    let result: any = null;
    if (this.required && this.value.length === 0) {
      result = { required: true };
    }
    if (this.maxlength > 0 && this.value.length > this.maxlength) {
      result = { maxlength: true };
    }
    return result;
  }

  writeValue(value: any): void {
    setTimeout(() => {
      this.value = '';
      if (typeof value !== 'undefined' && this.codeMirrorElement) {
        this.codeMirrorElement.setValue(value || '');
      }
    }, 1);
  }
  registerOnChange(fn: (_: any) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }
  
  @ViewChild("editor") editor: ElementRef;

  private codeMirrorElement: any;

  constructor(
    @Attribute('required') public required: boolean = false,
    @Attribute('maxlength') public maxlength: number = -1,
    private fileService: AbstractFileService,  
  ) { }

  ngOnInit() {
    this.fileService.getFileSelected$().subscribe((value: {id: string, file: BlogFile}) => {
      if (value.id === 'pageEditor') {
        this.insertContent('image', `/api/v1/files/${value.file.id}`);
        this.fileService.hideFileManager('pageEditor');
      }
    });
  }

  ngAfterViewInit(): void {

    this.codeMirrorElement = CodeMirror.fromTextArea(this.editor.nativeElement, {
      mode: 'htmlmixed',
      lineNumbers: true,
      autoCloseTags: true,
      lineWrapping: true,
      extraKeys: {"Ctrl-Space": "autocomplete"},
    });

    this.codeMirrorElement.doc.on('change', (instance: any, change: any) => {
      
      const newValue = instance.getValue();
      console.log('VALUE CHANGED TO', newValue);
      this.value = newValue;
    });
  }

  displaySelection() {
    console.log('Selection is:', this.codeMirrorElement.getSelection())
  }

  getCursor() {
    console.log('Cursor position is:', this.codeMirrorElement.getCursor())
  }

  chooseImage() {
    this.fileService.showFileManager('pageEditor');
  }

  insertContent(type: string, value?: string) {

    var cursorPosition = this.codeMirrorElement.getCursor();
    console.log('CURSOR POSITION IS: ', cursorPosition);
    var selection = this.codeMirrorElement.getSelection();
   
    var replacement = '';
    switch(type) {
      case 'bold':
        replacement = `<b>${selection}</b>`;
        cursorPosition.ch += selection.length + 3;
      break;
      case 'italic':
        replacement = `<i>${selection}</i>`;
        cursorPosition.ch += selection.length + 3;
      break;
      case 'quote':
        replacement = `<blockquote>${selection}</blockquote>`;
        cursorPosition.ch += selection.length + 12;
        break;
      case 'image':
        replacement = `<img src="${value}" alt="..."/>`;
        break;  
      default:

    }

    console.log('REPLACEMENT IS', replacement);
    this.codeMirrorElement.replaceSelection(replacement);
    this.codeMirrorElement.focus();
    this.codeMirrorElement.setCursor(cursorPosition);
  
  }

  resizeCodeMirror() {
    setTimeout(() => {
      const nativeElement = this.codeMirrorContainer.nativeElement;
      console.log('Setting size to', nativeElement.offsetWidth, nativeElement.offsetHeight);
      this.codeMirrorElement.setSize(nativeElement.offsetWidth, nativeElement.offsetHeight);
    }, 200);
  }

  previewInModal() {
    UIkit.modal('#preview-content').show();
  }

}