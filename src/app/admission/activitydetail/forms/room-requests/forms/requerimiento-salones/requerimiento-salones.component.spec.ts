import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoSalonesComponent } from './requerimiento-salones.component';

describe('RequerimientoSalonesComponent', () => {
  let component: RequerimientoSalonesComponent;
  let fixture: ComponentFixture<RequerimientoSalonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequerimientoSalonesComponent]
    });
    fixture = TestBed.createComponent(RequerimientoSalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
