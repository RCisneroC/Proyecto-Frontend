import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaSalonesComponent } from './reserva-salones.component';

describe('ReservaSalonesComponent', () => {
  let component: ReservaSalonesComponent;
  let fixture: ComponentFixture<ReservaSalonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaSalonesComponent]
    });
    fixture = TestBed.createComponent(ReservaSalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
