import { TestBed } from '@angular/core/testing';

import { FestivalService } from './festival.service';

describe('FestivalService', () => {
  let service: FestivalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FestivalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
