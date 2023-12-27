import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleActivityDetailComponent } from './schedule-activity-detail.component';

describe('ScheduleActivityDetailComponent', () => {
  let component: ScheduleActivityDetailComponent;
  let fixture: ComponentFixture<ScheduleActivityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleActivityDetailComponent]
    });
    fixture = TestBed.createComponent(ScheduleActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
