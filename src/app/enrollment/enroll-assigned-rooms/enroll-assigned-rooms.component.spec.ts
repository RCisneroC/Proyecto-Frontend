import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollAssignedRoomsComponent } from './enroll-assigned-rooms.component';

describe('EnrollAssignedRoomsComponent', () => {
  let component: EnrollAssignedRoomsComponent;
  let fixture: ComponentFixture<EnrollAssignedRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollAssignedRoomsComponent]
    });
    fixture = TestBed.createComponent(EnrollAssignedRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
