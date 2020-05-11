import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { BlogFile } from './../../api/blog-file';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => FileSelectorComponent)}
  ]
})
export class FileSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {

  fileId: string;
  disabled = false;
  private _onChange: Function;
  private _fileServiceSubscription: Subscription;

  private fileManagerString = 'FILE_SELECT';

  set value(value: string) {
    this.fileId = value;
    this.onChange(value);
  }

  onChange = (newValue: string) => {};
  onTouched = () => {};


  constructor(private fileService: AbstractFileService) { }

  writeValue(obj: any): void {
    //this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    this._fileServiceSubscription = this.fileService.getFileSelected$().subscribe((fileSelected: {id: string, file: BlogFile}) => {
      if (fileSelected) {
        this.value = fileSelected.file.id.toString();
        this.fileService.hideFileManager(this.fileManagerString);

        console.log('selected file id is: ' + this.fileId);
      }
    });
  }

  ngOnDestroy(): void {
    this._fileServiceSubscription.unsubscribe();
  }

  openFileManager() {
    this.fileService.showFileManager(this.fileManagerString);
  }
}
