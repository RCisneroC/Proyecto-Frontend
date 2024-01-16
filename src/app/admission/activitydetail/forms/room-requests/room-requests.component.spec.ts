import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRequestsComponent } from './room-requests.component';

describe('RoomRequestsComponent', () => {
  let component: RoomRequestsComponent;
  let fixture: ComponentFixture<RoomRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomRequestsComponent]
    });
    fixture = TestBed.createComponent(RoomRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
