import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollPeriodComponent } from './enroll-period.component';

describe('EnrollPeriodComponent', () => {
  let component: EnrollPeriodComponent;
  let fixture: ComponentFixture<EnrollPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollPeriodComponent]
    });
    fixture = TestBed.createComponent(EnrollPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
