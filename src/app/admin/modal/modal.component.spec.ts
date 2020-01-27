import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { ModalDirective } from './modal.directive';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { MockFileService } from './../../testing/mock-file-service';
import { Component } from '@angular/core';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  @Component({
    selector: 'app-markdown-editor', template: ''
  })
  class MarkdownEditorStub {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent, ModalDirective, MarkdownEditorStub ],
      providers: [
        {provide: AbstractFileService, useValue: new MockFileService(null)}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
