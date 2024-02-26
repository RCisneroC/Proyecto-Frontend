import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinalGradeComponent } from './add-final-grade.component';

describe('AddFinalGradeComponent', () => {
  let component: AddFinalGradeComponent;
  let fixture: ComponentFixture<AddFinalGradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFinalGradeComponent]
    });
    fixture = TestBed.createComponent(AddFinalGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
