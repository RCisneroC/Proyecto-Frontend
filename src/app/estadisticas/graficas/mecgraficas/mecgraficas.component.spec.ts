import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MECgraficasComponent } from './mecgraficas.component';

describe('MECgraficasComponent', () => {
  let component: MECgraficasComponent;
  let fixture: ComponentFixture<MECgraficasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MECgraficasComponent]
    });
    fixture = TestBed.createComponent(MECgraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
