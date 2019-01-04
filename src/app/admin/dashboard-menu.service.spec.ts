import { TestBed } from '@angular/core/testing';

import { DashboardMenuService } from './dashboard-menu.service';

describe('DashboardMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardMenuService = TestBed.get(DashboardMenuService);
    expect(service).toBeTruthy();
  });
});
