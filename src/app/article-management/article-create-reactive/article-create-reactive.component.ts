import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { Observable } from 'rxjs';
import { AbstractArticleService } from './../../services/article/abstract.article.service';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

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

  constructor(private fileService: AbstractFileService, private articleService: AbstractArticleService) { }

  ngOnInit(): void {
  }


  openFileManager() {
    this.fileService.showFileManager('BACKGROUND');
  }

  onSubmit() {
    console.log('save the article here...');
  }


  validateNameAsync({value}: AbstractControl): Observable<ValidationErrors | null> {
    console.log('checking name ' + value);
    return this.articleService.isNameTaken(value)
      .pipe(
        debounceTime(500),
        map((nameExists: boolean) => {
          if (nameExists) {
              return {
                  isExists: true
              };
          }
          return null;
        })
    );
  }

}
