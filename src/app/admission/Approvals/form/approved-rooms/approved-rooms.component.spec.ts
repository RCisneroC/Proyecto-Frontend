import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRoomsComponent } from './approved-rooms.component';

describe('ApprovedRoomsComponent', () => {
  let component: ApprovedRoomsComponent;
  let fixture: ComponentFixture<ApprovedRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedRoomsComponent]
    });
    fixture = TestBed.createComponent(ApprovedRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
