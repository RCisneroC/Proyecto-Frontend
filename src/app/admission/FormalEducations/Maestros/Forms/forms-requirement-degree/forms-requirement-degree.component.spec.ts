import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsRequirementDegreeComponent } from './forms-requirement-degree.component';

describe('FormsRequirementDegreeComponent', () => {
  let component: FormsRequirementDegreeComponent;
  let fixture: ComponentFixture<FormsRequirementDegreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsRequirementDegreeComponent]
    });
    fixture = TestBed.createComponent(FormsRequirementDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
