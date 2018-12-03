import { Component, OnInit } from '@angular/core';
import { ActuatorService } from '../../services/actuator/actuator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalRequests: number;
  totalTimeSeconds: number;

  constructor(private actuatorService: ActuatorService) { }

  ngOnInit() {
    this.actuatorService.getTotalApiRequests().subscribe(jsonData => {
      this.totalRequests = jsonData.measurements[0].value;
      this.totalTimeSeconds = jsonData.measurements[1].value;
    });
  }
}
