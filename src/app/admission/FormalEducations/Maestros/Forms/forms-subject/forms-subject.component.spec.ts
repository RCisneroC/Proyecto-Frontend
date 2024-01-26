import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSubjectComponent } from './forms-subject.component';

describe('FormsSubjectComponent', () => {
  let component: FormsSubjectComponent;
  let fixture: ComponentFixture<FormsSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsSubjectComponent]
    });
    fixture = TestBed.createComponent(FormsSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
