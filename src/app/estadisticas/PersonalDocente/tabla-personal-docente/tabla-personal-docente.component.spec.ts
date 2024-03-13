import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPersonalDocenteComponent } from './tabla-personal-docente.component';

describe('TablaPersonalDocenteComponent', () => {
  let component: TablaPersonalDocenteComponent;
  let fixture: ComponentFixture<TablaPersonalDocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaPersonalDocenteComponent]
    });
    fixture = TestBed.createComponent(TablaPersonalDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
