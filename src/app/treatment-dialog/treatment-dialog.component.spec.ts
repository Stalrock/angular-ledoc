import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentDialogComponent } from './treatment-dialog.component';

describe('TreatmentDialogComponent', () => {
  let component: TreatmentDialogComponent;
  let fixture: ComponentFixture<TreatmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
