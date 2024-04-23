import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceLevelScoreListComponent } from './experience-level-score-list.component';

describe('ExperienceLevelScoreListComponent', () => {
  let component: ExperienceLevelScoreListComponent;
  let fixture: ComponentFixture<ExperienceLevelScoreListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceLevelScoreListComponent]
    });
    fixture = TestBed.createComponent(ExperienceLevelScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
