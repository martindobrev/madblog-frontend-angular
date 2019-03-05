import { TestBed } from '@angular/core/testing';

import { DashboardMenuService } from './dashboard-menu.service';
import { of } from 'rxjs';
import { RoutingService } from '../routing.service';
import { MockActivatedRoute } from '../testing/activated-route-mock';
import { User } from '../api/user';
import { TEST_USER } from '../testing/mock-users';

let routingServiceMock = {
  currentUrl$: of('test')
}


describe('DashboardMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: RoutingService, useValue: routingServiceMock } 
    ]
  }));

  it('should be created', () => {
    const service: DashboardMenuService = TestBed.get(DashboardMenuService);
    expect(service).toBeTruthy();
  });
});
