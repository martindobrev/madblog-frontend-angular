import { Component, OnInit } from '@angular/core';
import { SnippetService } from '../../shared/snippet/snippet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Snippet } from './../../api/snippet';

@Component({
  selector: 'app-snippet-edit',
  templateUrl: './../snippet-create/snippet-create.component.html',
  styleUrls: ['./snippet-edit.component.css']
})
export class SnippetEditComponent implements OnInit {

  snippet: Snippet;

  constructor(private snippetService: SnippetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.snippet = data.snippet;
    });
  }

  saveSnippet() {
    this.snippetService.saveSnippet(this.snippet).subscribe(snippet => {
      if (snippet.id) {
        this.router.navigate(['./../..'], {relativeTo: this.activatedRoute});
      }
    });
  }
}
