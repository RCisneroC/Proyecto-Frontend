import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionMallaComponent } from './asignacion-malla.component';

describe('AsignacionMallaComponent', () => {
  let component: AsignacionMallaComponent;
  let fixture: ComponentFixture<AsignacionMallaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignacionMallaComponent]
    });
    fixture = TestBed.createComponent(AsignacionMallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
