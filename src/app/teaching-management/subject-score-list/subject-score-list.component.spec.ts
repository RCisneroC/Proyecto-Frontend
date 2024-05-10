import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectScoreListComponent } from './subject-score-list.component';

describe('SubjectScoreListComponent', () => {
  let component: SubjectScoreListComponent;
  let fixture: ComponentFixture<SubjectScoreListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectScoreListComponent]
    });
    fixture = TestBed.createComponent(SubjectScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
