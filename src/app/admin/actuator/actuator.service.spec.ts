import { TestBed } from '@angular/core/testing';

import { ActuatorService } from './actuator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';


let httpClientSpy: { get: jasmine.Spy };

describe('ActuatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: httpClientSpy }
    ]
  }));

  it('should be created', () => {
    const service: ActuatorService = TestBed.get(ActuatorService);
    expect(service).toBeTruthy();
  });
});
