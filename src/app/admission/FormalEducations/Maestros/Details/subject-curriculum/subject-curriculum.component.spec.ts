import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCurriculumComponent } from './subject-curriculum.component';

describe('SubjectCurriculumComponent', () => {
  let component: SubjectCurriculumComponent;
  let fixture: ComponentFixture<SubjectCurriculumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectCurriculumComponent]
    });
    fixture = TestBed.createComponent(SubjectCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
