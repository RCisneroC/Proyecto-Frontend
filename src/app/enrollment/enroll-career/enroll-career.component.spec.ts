import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollCareerComponent } from './enroll-career.component';

describe('EnrollCareerComponent', () => {
  let component: EnrollCareerComponent;
  let fixture: ComponentFixture<EnrollCareerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollCareerComponent]
    });
    fixture = TestBed.createComponent(EnrollCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
