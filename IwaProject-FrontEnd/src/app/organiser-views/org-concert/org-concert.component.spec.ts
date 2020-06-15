import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgConcertComponent } from './org-concert.component';

describe('OrgConcertComponent', () => {
  let component: OrgConcertComponent;
  let fixture: ComponentFixture<OrgConcertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgConcertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgConcertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
