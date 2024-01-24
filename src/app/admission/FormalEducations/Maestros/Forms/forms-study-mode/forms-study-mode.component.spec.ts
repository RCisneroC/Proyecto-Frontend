import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsStudyModeComponent } from './forms-study-mode.component';

describe('FormsStudyModeComponent', () => {
  let component: FormsStudyModeComponent;
  let fixture: ComponentFixture<FormsStudyModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsStudyModeComponent]
    });
    fixture = TestBed.createComponent(FormsStudyModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
