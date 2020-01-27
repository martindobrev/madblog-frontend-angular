import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FileService', () => {

  let fileService: FileService,
  httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FileService
      ]
    });
    fileService = TestBed.get(FileService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

});
