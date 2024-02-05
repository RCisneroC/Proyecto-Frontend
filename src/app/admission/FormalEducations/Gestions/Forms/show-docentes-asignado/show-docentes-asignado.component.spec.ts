import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDocentesAsignadoComponent } from './show-docentes-asignado.component';

describe('ShowDocentesAsignadoComponent', () => {
  let component: ShowDocentesAsignadoComponent;
  let fixture: ComponentFixture<ShowDocentesAsignadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDocentesAsignadoComponent]
    });
    fixture = TestBed.createComponent(ShowDocentesAsignadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
