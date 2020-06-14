import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertDialogComponent } from './concert-dialog.component';

describe('ConcertDialogComponent', () => {
  let component: ConcertDialogComponent;
  let fixture: ComponentFixture<ConcertDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
