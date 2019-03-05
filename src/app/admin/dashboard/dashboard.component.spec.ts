import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterModule, ActivatedRoute, Router, UrlSegment, ActivatedRouteSnapshot } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { of } from 'rxjs';
import { createMockServiceFactory } from './../../services/keycloak/keycloak-mock.service';
import { RoutingService } from './../../../app/routing.service';
import { AbstractKeycloakService } from './../../../app/services/keycloak/abstract.keycloak.service';
import { DashboardMenuService } from '../dashboard-menu.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { TestingModule } from './../../testing/testing.module';
import { MockActivatedRoute } from './../../testing/activated-route-mock';
import { TEST_USER } from './../../testing/mock-users';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;


  @Component({selector: 'router-outlet', template: ''})
  class RouterOutletStubComponent { }
  

  @Component({selector: 'app-modal', template: ''})
  class StubModalComponent { }

  const routingServiceMock = jasmine.createSpyObj('RoutingService', ['test']);
  routingServiceMock.currentUrl$ = of('testURL');

  const mockKeycloakFactory = createMockServiceFactory(['admin']);

  const dashboadMenuServiceMock = {
    dashboadMenuItem$: of([{label: 'test', url: 'test'}])
  };


  const activatedRouteMock = new MockActivatedRoute({userData: TEST_USER});
  const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
  //routerMock.
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, StubModalComponent, RouterOutletStubComponent ],
      imports: [TestingModule],
      providers: [
        {provide: RoutingService, useValue: routingServiceMock},
        {provide: AbstractKeycloakService, useValue: mockKeycloakFactory},
        {provide: DashboardMenuService, useValue: dashboadMenuServiceMock},
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: Router, useValue: routerMock}
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
