import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagerComponent } from './file-manager.component';
import { Component } from '@angular/core';
import { MockActivatedRoute } from './../../testing/activated-route-mock';
import { ActivatedRoute } from '@angular/router';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { MockFileService } from './../../testing/mock-file-service';
import { FileService } from '../../services/file/file.service';
import { PaginationComponent } from '../../shared/article-pagination/pagination.component';
import { SearchComponent } from './../../shared/search/search.component';
import { BlogFileCollection, BlogFilePage } from './../../api/blog-file';

describe('FileManagerComponent', () => {
  @Component({
    selector: 'app-file-upload', template: ''
  })
  class AppFileUploadStub {}

  let component: FileManagerComponent;
  let fixture: ComponentFixture<FileManagerComponent>;

  const testBlogFilePage = new BlogFilePage();
  testBlogFilePage.blogFiles = [
    {id: 1, name: 'test.jpg', contentType: 'image/jpeg', size: 1232131},
      {id: 2, name: 'test2.jpg', contentType: 'image/jpeg', size: 3213232}
  ];
  testBlogFilePage.pageNumber = 0;
  testBlogFilePage.totalFiles = 2;
  testBlogFilePage.totalPages = 1;

  const activatedRouteMock = new MockActivatedRoute({
    blogPage: testBlogFilePage
  });

  let fileService: FileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileManagerComponent, AppFileUploadStub, PaginationComponent, SearchComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: AbstractFileService, useValue: new MockFileService(testBlogFilePage)},
        {provide: PaginationComponent}
      ]
    })
    .compileComponents();
  }
  ));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fileService = TestBed.get(AbstractFileService);
  });

  it ('should throw error when selecting non-existing file', () => {
    let flag = false;
    try {
    component.selectItem(
      {id: 7, name: 'test7.jpg', contentType: 'image/jpeg', size: 32423232}
    );
    } catch (exception) {
      flag = true;
    }
    expect(flag).toBe(true);
  });


  it ('should select correct a file', () => {
    let flag = false;
    try {
    component.selectItem(
      {id: 1, name: 'test.jpg', contentType: 'image/jpeg', size: 1232131}
    );
    } catch (exception) {
      flag = true;
    }
    expect(flag).toBe(false);
  });


  it ('should not throw exception when deleting non-existing file', () => {

    component.deleteFile({id: 3, name: 'test3', size: 231233, contentType: 'test3'});
    fixture.detectChanges();
    expect(component.deleteFile({id: 3, name: 'test3', size: 231233, contentType: 'test3'})).toBeFalsy();
    expect(component.blogFiles.length).toBe(2);
    expect(component.blogFiles[1].id).toBe(2);

  });

  it('should delete correct file', () => {

    component.deleteFile({id: 2, name: 'test', size: 23123, contentType: 'test'});

    fixture.detectChanges();

    expect(component.blogFiles.length).toBe(1);
    expect(component.blogFiles[0].id).toBe(1);
    expect(component.blogFiles[0].name).toBe('test.jpg');

    // const el = fixture.nativeElement as HTMLElement;

    // expect(el.innerHTML.includes('<span class="uk-text-small">test.jpg</span>')).toBeTruthy();
  });

});
