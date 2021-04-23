import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { MockFileService } from './../../testing/mock-file-service';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadComponent ],
      providers: [
        {provide: AbstractFileService, useValue: new MockFileService(null)}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
