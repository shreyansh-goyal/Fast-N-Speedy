import { TestBed } from '@angular/core/testing';

import { RestaurantDeliveryService } from './restaurant-delivery.service';

describe('RestaurantDeliveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantDeliveryService = TestBed.get(RestaurantDeliveryService);
    expect(service).toBeTruthy();
  });
});
