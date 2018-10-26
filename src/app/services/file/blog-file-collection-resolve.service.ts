import { Injectable } from '@angular/core';
import { BlogFileCollection } from '../../api/blog-file';
import { Resolve } from '@angular/router';
import { AbstractFileService } from './abstract.file.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogFileCollectionResolveService implements Resolve<BlogFileCollection> {

  constructor(private fileService: AbstractFileService) {}

  resolve(): Observable<BlogFileCollection> {
    return this.fileService.getFiles();
  }
}
