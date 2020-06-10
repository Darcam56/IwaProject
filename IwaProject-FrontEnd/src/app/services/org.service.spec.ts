import { TestBed } from '@angular/core/testing';

import { OrganiserService } from './org.service';

describe('OrgService', () => {
  let service: OrganiserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganiserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
