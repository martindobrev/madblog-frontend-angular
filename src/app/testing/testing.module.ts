import { FileService } from './../services/file/file.service';
import { AbstractFileService } from './../services/file/abstract.file.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkDirectiveStub } from './router-link-directive-stub';

@NgModule({
  declarations: [RouterLinkDirectiveStub],
  imports: [
    CommonModule
  ],
  exports: [
    RouterLinkDirectiveStub
  ],
  providers: [
    FileService
  ]
})
export class TestingModule { }
