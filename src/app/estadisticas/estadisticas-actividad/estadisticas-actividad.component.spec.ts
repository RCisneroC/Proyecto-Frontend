import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasActividadComponent } from './estadisticas-actividad.component';

describe('EstadisticasActividadComponent', () => {
  let component: EstadisticasActividadComponent;
  let fixture: ComponentFixture<EstadisticasActividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasActividadComponent]
    });
    fixture = TestBed.createComponent(EstadisticasActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
