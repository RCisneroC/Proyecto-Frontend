import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredDocumentPointsFormComponent } from './required-document-points-form.component';

describe('RequiredDocumentPointsFormComponent', () => {
  let component: RequiredDocumentPointsFormComponent;
  let fixture: ComponentFixture<RequiredDocumentPointsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequiredDocumentPointsFormComponent]
    });
    fixture = TestBed.createComponent(RequiredDocumentPointsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
