import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreteAsignacionDocenteComponent } from './crete-asignacion-docente.component';

describe('CreteAsignacionDocenteComponent', () => {
  let component: CreteAsignacionDocenteComponent;
  let fixture: ComponentFixture<CreteAsignacionDocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreteAsignacionDocenteComponent]
    });
    fixture = TestBed.createComponent(CreteAsignacionDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
