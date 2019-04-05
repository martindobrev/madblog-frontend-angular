import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Snippet } from '../../api/snippet';
import { Observable } from 'rxjs';
import { SnippetService } from './snippet.service';

@Injectable({
  providedIn: 'root'
})
export class SnippetResolveService implements Resolve<Snippet> {

  constructor(private snippetService: SnippetService) { }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Snippet> {
    return this.snippetService.getSnippetByName(activatedRouteSnapshot.paramMap.get('name'));
  }
}
