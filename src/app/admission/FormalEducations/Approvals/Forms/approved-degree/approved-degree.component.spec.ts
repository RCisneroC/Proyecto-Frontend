import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDegreeComponent } from './approved-degree.component';

describe('ApprovedDegreeComponent', () => {
  let component: ApprovedDegreeComponent;
  let fixture: ComponentFixture<ApprovedDegreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedDegreeComponent]
    });
    fixture = TestBed.createComponent(ApprovedDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
