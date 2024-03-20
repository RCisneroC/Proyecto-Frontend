import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasMatriculaComponent } from './estadisticas-matricula.component';

describe('EstadisticasMatriculaComponent', () => {
  let component: EstadisticasMatriculaComponent;
  let fixture: ComponentFixture<EstadisticasMatriculaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasMatriculaComponent]
    });
    fixture = TestBed.createComponent(EstadisticasMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
