import { Component, OnInit } from '@angular/core';
import { Snippet } from './../../api/snippet';
import { SnippetService } from '../../shared/snippet/snippet.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-snippet-create',
  templateUrl: './snippet-create.component.html',
  styleUrls: ['./snippet-create.component.css']
})
export class SnippetCreateComponent implements OnInit {

  snippet: Snippet = new Snippet();

  constructor(private snippetService: SnippetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  saveSnippet() {
    this.snippetService.saveSnippet(this.snippet).subscribe(snippet => {
      if (snippet.id) {
        this.router.navigate(['./..'], {relativeTo: this.activatedRoute});
      }
    }) 
  }

}
