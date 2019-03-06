import { TestBed } from '@angular/core/testing';

import { SnippetResolveService } from './snippet-resolve.service';

describe('SnippetResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnippetResolveService = TestBed.get(SnippetResolveService);
    expect(service).toBeTruthy();
  });
});
