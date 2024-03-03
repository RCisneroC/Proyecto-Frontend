import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasCarrerasComponent } from './ofertas-carreras.component';

describe('OfertasCarrerasComponent', () => {
  let component: OfertasCarrerasComponent;
  let fixture: ComponentFixture<OfertasCarrerasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfertasCarrerasComponent]
    });
    fixture = TestBed.createComponent(OfertasCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
