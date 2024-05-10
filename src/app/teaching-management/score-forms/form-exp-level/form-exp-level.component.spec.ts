import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExpLevelComponent } from './form-exp-level.component';

describe('FormExpLevelComponent', () => {
  let component: FormExpLevelComponent;
  let fixture: ComponentFixture<FormExpLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormExpLevelComponent]
    });
    fixture = TestBed.createComponent(FormExpLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
