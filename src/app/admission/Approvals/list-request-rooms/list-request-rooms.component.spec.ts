import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestRoomsComponent } from './list-request-rooms.component';

describe('ListRequestRoomsComponent', () => {
  let component: ListRequestRoomsComponent;
  let fixture: ComponentFixture<ListRequestRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRequestRoomsComponent]
    });
    fixture = TestBed.createComponent(ListRequestRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
