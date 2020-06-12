import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecOwnFestivalsComponent } from './spec-own-festivals.component';

describe('SpecOwnFestivalsComponent', () => {
  let component: SpecOwnFestivalsComponent;
  let fixture: ComponentFixture<SpecOwnFestivalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecOwnFestivalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecOwnFestivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
