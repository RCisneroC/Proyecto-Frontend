import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyModeComponent } from './study-mode.component';

describe('StudyModeComponent', () => {
  let component: StudyModeComponent;
  let fixture: ComponentFixture<StudyModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyModeComponent]
    });
    fixture = TestBed.createComponent(StudyModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
