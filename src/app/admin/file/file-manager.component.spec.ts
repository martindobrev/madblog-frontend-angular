import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileManagerComponent } from './file-manager.component';
import { Component } from '@angular/core';
import { MockActivatedRoute } from './../../testing/activated-route-mock';
import { ActivatedRoute } from '@angular/router';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { MockFileService } from './../../testing/mock-file-service';

describe('FileManagerComponent', () => {
  @Component({
    selector: 'app-file-upload', template: ''
  })
  class AppFileUploadStub {}

  let component: FileManagerComponent;
  let fixture: ComponentFixture<FileManagerComponent>;

  const activatedRouteMock = new MockActivatedRoute({blogFileCollection: {blogFiles: []}});

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileManagerComponent, AppFileUploadStub ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: AbstractFileService, useValue: new MockFileService(null)}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
