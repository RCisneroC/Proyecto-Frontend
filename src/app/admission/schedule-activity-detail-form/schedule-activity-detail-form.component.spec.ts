import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleActivityDetailFormComponent } from './schedule-activity-detail-form.component';

describe('ScheduleActivityDetailFormComponent', () => {
  let component: ScheduleActivityDetailFormComponent;
  let fixture: ComponentFixture<ScheduleActivityDetailFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleActivityDetailFormComponent]
    });
    fixture = TestBed.createComponent(ScheduleActivityDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
