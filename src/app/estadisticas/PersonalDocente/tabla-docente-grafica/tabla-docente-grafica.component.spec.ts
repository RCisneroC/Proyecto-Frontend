import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDocenteGraficaComponent } from './tabla-docente-grafica.component';

describe('TablaDocenteGraficaComponent', () => {
  let component: TablaDocenteGraficaComponent;
  let fixture: ComponentFixture<TablaDocenteGraficaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaDocenteGraficaComponent]
    });
    fixture = TestBed.createComponent(TablaDocenteGraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
