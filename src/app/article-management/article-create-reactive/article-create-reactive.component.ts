import { Component, OnInit, forwardRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { Observable } from 'rxjs';
import { AbstractArticleService } from './../../services/article/abstract.article.service';
import { debounceTime, map, distinctUntilChanged, switchMap, first } from 'rxjs/operators';
import { FileSelectorComponent } from './../../shared/file-selector/file-selector.component';

@Component({
  selector: 'app-article-create-reactive',
  templateUrl: './article-create-reactive.component.html',
  styleUrls: ['./article-create-reactive.component.css'],
})
export class ArticleCreateReactiveComponent implements OnInit {

  articleFormGroup = new FormGroup({
    'title': new FormControl(null, Validators.required, this.validateNameAsync.bind(this)),
    'subtitle': new FormControl(null, Validators.required),
    'content': new FormControl(null, Validators.required),
    'background-image': new FormControl(null),
    'published': new FormControl(true),
    'featured': new FormControl(false)
  });

  titleControl = this.articleFormGroup.get('title');

  constructor(private fileService: AbstractFileService, private articleService: AbstractArticleService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('save the article here...');
  }

  @traceCaller
  validateNameAsync(control: AbstractControl): Observable<ValidationErrors | null> {
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => this.articleService.isNameTaken(value)),
      map((isNameTaken: boolean) => {
        if (isNameTaken) {
            return {
                isTaken: true
            };
        }
        return null;
      }),
      first()
    );
  }
}

export function traceCaller(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const result = originalMethod.apply(this, args);
    console.log('Calling async validator, "this" is: ', this);
    return result;
  };
}
