import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageDialogComponent } from './stage-dialog.component';

describe('StageDialogComponent', () => {
  let component: StageDialogComponent;
  let fixture: ComponentFixture<StageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
