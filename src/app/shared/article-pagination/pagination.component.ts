import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalPages: number;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPageRequested = new EventEmitter<number>();

  pages: Array<number>;

  constructor() { }

  ngOnInit() {
    this.pages = Array(this.totalPages).fill(1);
  }

  loadPage(pageNumber: number) {
    this.onPageRequested.emit(pageNumber);
  }

}
