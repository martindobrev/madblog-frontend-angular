import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from './../../services/page/menu.service';
import { Page } from './../../api/page';

@Component({
  selector: 'app-page-edit',
  templateUrl: './../page-create/page-create.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  page: Page = new Page();

  constructor(private activatedRoute: ActivatedRoute, private menuService: MenuService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      console.log('PAGE LOADED: ', data.page);
      this.page = data.page;
    });
  }

  savePage() {
    console.log('EDIT PAGE: ', this.page);
    this.menuService.editPage(this.page).subscribe(page => {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute});
    });
  }
}
