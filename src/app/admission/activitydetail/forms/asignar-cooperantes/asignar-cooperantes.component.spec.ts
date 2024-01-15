import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCooperantesComponent } from './asignar-cooperantes.component';

describe('AsignarCooperantesComponent', () => {
  let component: AsignarCooperantesComponent;
  let fixture: ComponentFixture<AsignarCooperantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignarCooperantesComponent]
    });
    fixture = TestBed.createComponent(AsignarCooperantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
