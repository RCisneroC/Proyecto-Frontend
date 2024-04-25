import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityScoreListComponent } from './activity-score-list.component';

describe('ActivityScoreListComponent', () => {
  let component: ActivityScoreListComponent;
  let fixture: ComponentFixture<ActivityScoreListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityScoreListComponent]
    });
    fixture = TestBed.createComponent(ActivityScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
