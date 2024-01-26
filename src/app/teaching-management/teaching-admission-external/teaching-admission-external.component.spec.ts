import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingAdmissionExternalComponent } from './teaching-admission-external.component';

describe('TeachingAdmissionExternalComponent', () => {
  let component: TeachingAdmissionExternalComponent;
  let fixture: ComponentFixture<TeachingAdmissionExternalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachingAdmissionExternalComponent]
    });
    fixture = TestBed.createComponent(TeachingAdmissionExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
