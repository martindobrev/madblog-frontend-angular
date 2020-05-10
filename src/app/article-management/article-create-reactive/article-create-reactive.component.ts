import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { Observable } from 'rxjs';
import { AbstractArticleService } from './../../services/article/abstract.article.service';
import { debounceTime, map, distinctUntilChanged, switchMap, first } from 'rxjs/operators';

@Component({
  selector: 'app-article-create-reactive',
  templateUrl: './article-create-reactive.component.html',
  styleUrls: ['./article-create-reactive.component.css']
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


  openFileManager() {
    this.fileService.showFileManager('BACKGROUND');
  }

  onSubmit() {
    console.log('save the article here...');
  }


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
