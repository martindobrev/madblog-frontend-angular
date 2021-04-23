import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArticleViewComponent } from './article-view.component';

import { Article } from './../../../api/article';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { User } from './../../../api/user';


describe('ArticleViewComponent', () => {
  let component: ArticleViewComponent;
  let fixture: ComponentFixture<ArticleViewComponent>;

  let activatedRouteMock = {
    data: of({
      articleAndUserArray: [new Article(), new User()]
    })
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleViewComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
