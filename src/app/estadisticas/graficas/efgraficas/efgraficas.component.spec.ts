import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfgraficasComponent } from './efgraficas.component';

describe('EfgraficasComponent', () => {
  let component: EfgraficasComponent;
  let fixture: ComponentFixture<EfgraficasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EfgraficasComponent]
    });
    fixture = TestBed.createComponent(EfgraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
