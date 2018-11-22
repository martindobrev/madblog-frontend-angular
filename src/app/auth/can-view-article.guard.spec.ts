import { TestBed, async, inject } from '@angular/core/testing';

import { CanViewArticleGuard } from './can-view-article.guard';

describe('CanViewArticleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanViewArticleGuard]
    });
  });

  it('should ...', inject([CanViewArticleGuard], (guard: CanViewArticleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
