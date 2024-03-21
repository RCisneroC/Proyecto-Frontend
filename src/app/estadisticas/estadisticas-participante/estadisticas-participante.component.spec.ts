import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasParticipanteComponent } from './estadisticas-participante.component';

describe('EstadisticasParticipanteComponent', () => {
  let component: EstadisticasParticipanteComponent;
  let fixture: ComponentFixture<EstadisticasParticipanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasParticipanteComponent]
    });
    fixture = TestBed.createComponent(EstadisticasParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
