import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySolicitudComponent } from './history-solicitud.component';

describe('HistorySolicitudComponent', () => {
  let component: HistorySolicitudComponent;
  let fixture: ComponentFixture<HistorySolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorySolicitudComponent]
    });
    fixture = TestBed.createComponent(HistorySolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
