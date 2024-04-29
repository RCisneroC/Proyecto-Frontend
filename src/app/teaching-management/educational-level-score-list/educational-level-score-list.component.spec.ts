import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalLevelScoreListComponent } from './educational-level-score-list.component';

describe('EducationalLevelScoreListComponent', () => {
  let component: EducationalLevelScoreListComponent;
  let fixture: ComponentFixture<EducationalLevelScoreListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationalLevelScoreListComponent]
    });
    fixture = TestBed.createComponent(EducationalLevelScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
