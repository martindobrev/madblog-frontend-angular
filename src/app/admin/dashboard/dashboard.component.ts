import { Component, OnInit } from '@angular/core';
import { RoutingService } from './../../routing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUrl: string;

  constructor(private routingService: RoutingService) { }

  ngOnInit() {
    this.routingService.currentUrl$.subscribe(url => this.currentUrl = url);
  }
}
