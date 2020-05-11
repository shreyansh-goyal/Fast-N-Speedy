import { TestBed } from '@angular/core/testing';

import { RegisterDriverService } from './register-driver.service';

describe('RegisterDriverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterDriverService = TestBed.get(RegisterDriverService);
    expect(service).toBeTruthy();
  });
});
