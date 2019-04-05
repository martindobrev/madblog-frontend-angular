import { Component, OnInit } from '@angular/core';
import { Page } from './../../api/page';
import { MenuService } from './../../services/page/menu.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.css']
})
export class PageCreateComponent implements OnInit {

  page: Page = new Page();

  error: string = null;
  constructor(private menuService: MenuService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }

  savePage() {
    this.menuService.createPage(this.page).subscribe(page => {
      this.router.navigate(['./..'], {relativeTo: this.activatedRoute});
    }, error => {
      console.log('Something went wrong when creating page');
      this.error = error;
    });
  }
}
