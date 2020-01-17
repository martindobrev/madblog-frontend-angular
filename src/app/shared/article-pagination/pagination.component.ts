import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalPages: number;
  @Output() pageRequested = new EventEmitter<number>();

  pages: Array<number>;

  constructor() { }

  ngOnInit() {
    this.pages = Array(this.totalPages).fill(1);
  }

  loadPage(pageNumber: number) {
    this.pageRequested.emit(pageNumber);
  }

}
