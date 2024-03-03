import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasActividadesComponent } from './ofertas-actividades.component';

describe('OfertasActividadesComponent', () => {
  let component: OfertasActividadesComponent;
  let fixture: ComponentFixture<OfertasActividadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfertasActividadesComponent]
    });
    fixture = TestBed.createComponent(OfertasActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
