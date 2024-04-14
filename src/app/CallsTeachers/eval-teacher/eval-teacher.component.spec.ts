import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalTeacherComponent } from './eval-teacher.component';

describe('EvalTeacherComponent', () => {
  let component: EvalTeacherComponent;
  let fixture: ComponentFixture<EvalTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvalTeacherComponent]
    });
    fixture = TestBed.createComponent(EvalTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
