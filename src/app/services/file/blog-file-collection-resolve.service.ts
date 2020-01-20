import { Injectable } from '@angular/core';
import { BlogFilePage } from '../../api/blog-file';
import { Resolve } from '@angular/router';
import { AbstractFileService } from './abstract.file.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogFileCollectionResolveService implements Resolve<BlogFilePage> {

  constructor(private fileService: AbstractFileService) {}

  resolve(): Observable<BlogFilePage> {
    return this.fileService.getFilePage(0, '');
  }
}
