import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsDegreeComponent } from './forms-degree.component';

describe('FormsDegreeComponent', () => {
  let component: FormsDegreeComponent;
  let fixture: ComponentFixture<FormsDegreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsDegreeComponent]
    });
    fixture = TestBed.createComponent(FormsDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
