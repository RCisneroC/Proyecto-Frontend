import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEspecializadaComponent } from './eespecializada.component';

describe('EEspecializadaComponent', () => {
  let component: EEspecializadaComponent;
  let fixture: ComponentFixture<EEspecializadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EEspecializadaComponent]
    });
    fixture = TestBed.createComponent(EEspecializadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
