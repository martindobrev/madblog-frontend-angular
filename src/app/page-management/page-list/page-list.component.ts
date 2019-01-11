import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page, PageCollection } from './../../api/page';
import { MenuService } from './../../services/page/menu.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BlockingProxy } from 'blocking-proxy';

declare var UIkit: any;

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit, AfterViewInit {

  pages: Array<Page>;
  markedForDeletion: Page;
  idToDelete: number = null;
  timer: number = null;

  @ViewChild('sortablePagesContainer') sortablePagesContainer: ElementRef; 

  constructor(private activatedRoute: ActivatedRoute, private menuService: MenuService) { 

  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      if (data.pageCollection) {
        this.pages = data.pageCollection.pages;
      } else {
        this.pages = [];
      }
    });
  }

  ngAfterViewInit() {
    this.sortablePagesContainer.nativeElement.addEventListener('stop', (event) => {
      this.reorderPages();
    });
    
    UIkit.sortable(this.sortablePagesContainer.nativeElement, {
      'handle'    : '.uk-sortable-handle',
      'cls-drag'  : '.uk-sortable-handle'
    });
  }

  pagePublishedChanged(page: Page, event: any) {
    const pageToBeSaved = page;
    pageToBeSaved.published = event.target.checked;

    this.menuService.editPage(pageToBeSaved).subscribe(page => {
      console.log(`Page ${page.name} published: ${page.published}`);
    });
  }


  private reorderPages() {
    
    let pageCollection = new PageCollection();
    let newOrderedPages = [];
    var pageDivs = this.sortablePagesContainer.nativeElement.children;
    for (var i = 0; i < pageDivs.length; i++) {
      let pageEl = pageDivs[i];
      let id = parseInt(pageEl.children[1].innerText);
      console.log(`ID is: ${id}`);
      let pageWithNewOrder = this.getPageById(id);
      pageWithNewOrder.order = i + 1;
      newOrderedPages.push(pageWithNewOrder);
    }
  
    this.pages = newOrderedPages;
    pageCollection.pages = newOrderedPages;
    this.menuService.reorderPages(pageCollection).subscribe(pageCollection => {
      this.pages = pageCollection.pages;
    });
    
  }

  private getPageById(id: number) {
    return this.pages.find(page => {
      return page.id === id;  
    });
  }

  deletePage(page: Page) {
    this.menuService.deletePage(page).subscribe(page => {

      if (this.timer) {
        this.disableTimer();
      }

      this.menuService.getPages().subscribe(pageCollection => {
        this.pages = pageCollection.pages;
      });
    });
  }

  markForDeletion(page: Page) {
    this.idToDelete = page.id;
    this.timer = window.setTimeout(() => {
      this.disableTimer();
    }, 2000);
  }

  private disableTimer() {
    this.idToDelete = null;
    window.clearTimeout(this.timer);
    this.timer = null;
  }
}
