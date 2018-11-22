import { TestBed } from '@angular/core/testing';

import { OwnArticleCollectionResolveService } from './own-article-collection-resolve.service';

describe('OwnArticleCollectionResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OwnArticleCollectionResolveService = TestBed.get(OwnArticleCollectionResolveService);
    expect(service).toBeTruthy();
  });
});
