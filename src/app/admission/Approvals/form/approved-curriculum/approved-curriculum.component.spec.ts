import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedCurriculumComponent } from './approved-curriculum.component';

describe('ApprovedCurriculumComponent', () => {
  let component: ApprovedCurriculumComponent;
  let fixture: ComponentFixture<ApprovedCurriculumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedCurriculumComponent]
    });
    fixture = TestBed.createComponent(ApprovedCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
