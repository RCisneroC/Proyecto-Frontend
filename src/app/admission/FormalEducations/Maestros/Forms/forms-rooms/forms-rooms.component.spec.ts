import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsRoomsComponent } from './forms-rooms.component';

describe('FormsRoomsComponent', () => {
  let component: FormsRoomsComponent;
  let fixture: ComponentFixture<FormsRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsRoomsComponent]
    });
    fixture = TestBed.createComponent(FormsRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
