import { TestBed } from '@angular/core/testing';

import { ArticleCollectionResolveService } from './article-collection-resolve.service';

describe('ArticleCollectionResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleCollectionResolveService = TestBed.get(ArticleCollectionResolveService);
    expect(service).toBeTruthy();
  });
});
