import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecFestivalsComponent } from './spec-festivals.component';

describe('SpecFestivalsComponent', () => {
  let component: SpecFestivalsComponent;
  let fixture: ComponentFixture<SpecFestivalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecFestivalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecFestivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
