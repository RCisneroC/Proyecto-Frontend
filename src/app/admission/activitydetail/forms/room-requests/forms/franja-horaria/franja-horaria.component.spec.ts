import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranjaHorariaComponent } from './franja-horaria.component';

describe('FranjaHorariaComponent', () => {
  let component: FranjaHorariaComponent;
  let fixture: ComponentFixture<FranjaHorariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FranjaHorariaComponent]
    });
    fixture = TestBed.createComponent(FranjaHorariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
