import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgraficasComponent } from './ecgraficas.component';

describe('EcgraficasComponent', () => {
  let component: EcgraficasComponent;
  let fixture: ComponentFixture<EcgraficasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcgraficasComponent]
    });
    fixture = TestBed.createComponent(EcgraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
