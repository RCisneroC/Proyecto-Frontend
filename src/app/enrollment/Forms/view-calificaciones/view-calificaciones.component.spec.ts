import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCalificacionesComponent } from './view-calificaciones.component';

describe('ViewCalificacionesComponent', () => {
  let component: ViewCalificacionesComponent;
  let fixture: ComponentFixture<ViewCalificacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCalificacionesComponent]
    });
    fixture = TestBed.createComponent(ViewCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
