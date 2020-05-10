import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCreateReactiveComponent } from './article-create-reactive.component';

describe('ArticleCreateReactiveComponent', () => {
  let component: ArticleCreateReactiveComponent;
  let fixture: ComponentFixture<ArticleCreateReactiveComponent>;

  beforeEach(async(() => {
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
