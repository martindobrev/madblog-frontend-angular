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
  ]
})
export class TestingModule { }
