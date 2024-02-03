import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomsPeriodComponent } from './create-rooms-period.component';

describe('CreateRoomsPeriodComponent', () => {
  let component: CreateRoomsPeriodComponent;
  let fixture: ComponentFixture<CreateRoomsPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoomsPeriodComponent]
    });
    fixture = TestBed.createComponent(CreateRoomsPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
