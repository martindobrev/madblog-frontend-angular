import { TestBed } from '@angular/core/testing';

import { SettingsResolveService } from './settings-resolve.service';

describe('SettingsResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsResolveService = TestBed.get(SettingsResolveService);
    expect(service).toBeTruthy();
  });
});
