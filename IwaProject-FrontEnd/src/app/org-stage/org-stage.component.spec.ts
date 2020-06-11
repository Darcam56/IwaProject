import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgStageComponent } from './org-stage.component';

describe('OrgStageComponent', () => {
  let component: OrgStageComponent;
  let fixture: ComponentFixture<OrgStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
