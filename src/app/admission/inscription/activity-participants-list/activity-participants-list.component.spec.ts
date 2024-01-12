import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityParticipantsListComponent } from './activity-participants-list.component';

describe('ActivityParticipantsListComponent', () => {
  let component: ActivityParticipantsListComponent;
  let fixture: ComponentFixture<ActivityParticipantsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityParticipantsListComponent]
    });
    fixture = TestBed.createComponent(ActivityParticipantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
