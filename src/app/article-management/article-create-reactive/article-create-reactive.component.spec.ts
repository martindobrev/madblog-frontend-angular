import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArticleCreateReactiveComponent } from './article-create-reactive.component';

describe('ArticleCreateReactiveComponent', () => {
  let component: ArticleCreateReactiveComponent;
  let fixture: ComponentFixture<ArticleCreateReactiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCreateReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCreateReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
