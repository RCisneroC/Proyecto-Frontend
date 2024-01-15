import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRequestRoomsComponent } from './details-request-rooms.component';

describe('DetailsRequestRoomsComponent', () => {
  let component: DetailsRequestRoomsComponent;
  let fixture: ComponentFixture<DetailsRequestRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsRequestRoomsComponent]
    });
    fixture = TestBed.createComponent(DetailsRequestRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
