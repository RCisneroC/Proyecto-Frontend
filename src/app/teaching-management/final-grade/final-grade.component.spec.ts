import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalGradeComponent } from './final-grade.component';

describe('FinalGradeComponent', () => {
  let component: FinalGradeComponent;
  let fixture: ComponentFixture<FinalGradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalGradeComponent]
    });
    fixture = TestBed.createComponent(FinalGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
