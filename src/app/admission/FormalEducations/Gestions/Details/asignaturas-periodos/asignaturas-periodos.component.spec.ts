import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasPeriodosComponent } from './asignaturas-periodos.component';

describe('AsignaturasPeriodosComponent', () => {
  let component: AsignaturasPeriodosComponent;
  let fixture: ComponentFixture<AsignaturasPeriodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignaturasPeriodosComponent]
    });
    fixture = TestBed.createComponent(AsignaturasPeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
