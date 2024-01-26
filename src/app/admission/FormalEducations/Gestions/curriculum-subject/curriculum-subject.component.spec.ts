import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumSubjectComponent } from './curriculum-subject.component';

describe('CurriculumSubjectComponent', () => {
  let component: CurriculumSubjectComponent;
  let fixture: ComponentFixture<CurriculumSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurriculumSubjectComponent]
    });
    fixture = TestBed.createComponent(CurriculumSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
