import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleActivityFormComponent } from './schedule-activity-form.component';

describe('ScheduleActivityFormComponent', () => {
  let component: ScheduleActivityFormComponent;
  let fixture: ComponentFixture<ScheduleActivityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleActivityFormComponent]
    });
    fixture = TestBed.createComponent(ScheduleActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
