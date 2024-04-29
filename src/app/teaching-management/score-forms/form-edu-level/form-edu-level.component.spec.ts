import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEduLevelComponent } from './form-edu-level.component';

describe('FormEduLevelComponent', () => {
  let component: FormEduLevelComponent;
  let fixture: ComponentFixture<FormEduLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEduLevelComponent]
    });
    fixture = TestBed.createComponent(FormEduLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
