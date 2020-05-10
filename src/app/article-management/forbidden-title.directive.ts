import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { AbstractArticleService } from '../services/article/abstract.article.service';
import { debounceTime, distinctUntilChanged, switchMap, map, first } from 'rxjs/operators';

@Directive({
  selector: '[appForbiddenTitle]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ForbiddenTitleDirective, multi: true, deps: [AbstractArticleService]}]
})
export class ForbiddenTitleDirective implements AsyncValidator {

  constructor(private articleService: AbstractArticleService) { }

  validate(control: AbstractControl):  Observable<ValidationErrors | null> {
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
