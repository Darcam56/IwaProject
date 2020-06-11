import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFestDialogComponent } from './new-fest-dialog.component';

describe('NewFestDialogComponent', () => {
  let component: NewFestDialogComponent;
  let fixture: ComponentFixture<NewFestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
