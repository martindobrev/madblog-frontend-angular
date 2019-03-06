import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Snippet, SnippetCollection } from '../api/snippet';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  constructor(private httpClient: HttpClient) { }


  getSnippets(): Observable<SnippetCollection> {
    return this.httpClient.get('/api/v1/snippets') as Observable<SnippetCollection>;
  }

  getSnippetByName(name: string): Observable<Snippet> {
    return this.httpClient.get(`/api/v1/snippets/${name}`) as Observable<Snippet>;
  }

  saveSnippet(snippet: Snippet): Observable<Snippet> {
    if (!snippet) {
      return of(null);
    }

    // Edit snippet
    if (snippet.id) {
      return this.httpClient.put(`/api/v1/snippets/${snippet.id}`, snippet) as Observable<Snippet>;
    }

    // create
    return this.httpClient.post('/api/v1/snippets', snippet) as Observable<Snippet>;
  }
}
