import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnippetCollection, Snippet } from './../../api/snippet';

@Component({
  selector: 'app-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.css']
})
export class SnippetListComponent implements OnInit {

  idToDelete: number;

  snippetCollection: SnippetCollection;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.snippetCollection = data.snippetCollection;
    });
  }

  deleteSnippet(snippet: Snippet) {
    // TODO
  }

  markForDeletion(snippet: Snippet) {
    
  }

}
