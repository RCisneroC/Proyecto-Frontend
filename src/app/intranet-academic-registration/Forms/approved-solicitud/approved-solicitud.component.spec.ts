import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedSolicitudComponent } from './approved-solicitud.component';

describe('ApprovedSolicitudComponent', () => {
  let component: ApprovedSolicitudComponent;
  let fixture: ComponentFixture<ApprovedSolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedSolicitudComponent]
    });
    fixture = TestBed.createComponent(ApprovedSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
