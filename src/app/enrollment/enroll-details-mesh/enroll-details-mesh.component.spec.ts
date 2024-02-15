import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollDetailsMeshComponent } from './enroll-details-mesh.component';

describe('EnrollDetailsMeshComponent', () => {
  let component: EnrollDetailsMeshComponent;
  let fixture: ComponentFixture<EnrollDetailsMeshComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollDetailsMeshComponent]
    });
    fixture = TestBed.createComponent(EnrollDetailsMeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
