import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalStatsComponent } from './global-stats.component';
import { ActuatorService } from '../actuator/actuator.service';
import { MockActuatorService } from './../../testing/mock-actuator-service';

describe('GlobalStatsComponent', () => {
  let component: GlobalStatsComponent;
  let fixture: ComponentFixture<GlobalStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalStatsComponent ],
      providers: [
        {provide: ActuatorService, useValue: new MockActuatorService()}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
