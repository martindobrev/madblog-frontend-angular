import { TestBed } from '@angular/core/testing';

import { SnippetCollectionResolveService } from './snippet-collection-resolve.service';

describe('SnippetCollectionResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnippetCollectionResolveService = TestBed.get(SnippetCollectionResolveService);
    expect(service).toBeTruthy();
  });
});
