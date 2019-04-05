import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SnippetCollection } from '../../api/snippet';
import { SnippetService } from './snippet.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnippetCollectionResolveService implements Resolve<SnippetCollection> {
  
  constructor(private snippetService: SnippetService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SnippetCollection | Observable<SnippetCollection> | Promise<SnippetCollection> {
    return this.snippetService.getSnippets();
  }

}
