import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { tap, debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements AfterViewInit {

  // @Input() public searchString: string;
  @Output() public onTextInserted = new EventEmitter<string>();
  @ViewChild('userInput', {static: true}) public input;

  private searchString = '';
  constructor() { }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'input').pipe(
      tap(() => this.searchString = this.input.nativeElement.value),
      debounceTime(250)
    ).subscribe(() => {
      this.onTextInserted.emit(this.searchString);
    });
  }
}
