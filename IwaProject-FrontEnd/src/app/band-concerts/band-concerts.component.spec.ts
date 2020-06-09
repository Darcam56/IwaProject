import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandConcertsComponent } from './band-concerts.component';

describe('BandConcertsComponent', () => {
  let component: BandConcertsComponent;
  let fixture: ComponentFixture<BandConcertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandConcertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandConcertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
