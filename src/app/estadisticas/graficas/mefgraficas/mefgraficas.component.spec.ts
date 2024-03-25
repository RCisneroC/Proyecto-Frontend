import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MEFgraficasComponent } from './mefgraficas.component';

describe('MEFgraficasComponent', () => {
  let component: MEFgraficasComponent;
  let fixture: ComponentFixture<MEFgraficasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MEFgraficasComponent]
    });
    fixture = TestBed.createComponent(MEFgraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
