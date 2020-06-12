import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgFestComponent } from './org-fest.component';

describe('OrgFestComponent', () => {
  let component: OrgFestComponent;
  let fixture: ComponentFixture<OrgFestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgFestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgFestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
