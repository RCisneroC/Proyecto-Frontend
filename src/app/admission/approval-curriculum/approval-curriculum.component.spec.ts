import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalCurriculumComponent } from './approval-curriculum.component';

describe('ApprovalCurriculumComponent', () => {
  let component: ApprovalCurriculumComponent;
  let fixture: ComponentFixture<ApprovalCurriculumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalCurriculumComponent]
    });
    fixture = TestBed.createComponent(ApprovalCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
