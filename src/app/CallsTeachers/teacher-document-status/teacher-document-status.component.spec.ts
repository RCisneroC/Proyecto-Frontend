import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDocumentStatusComponent } from './teacher-document-status.component';

describe('TeacherDocumentStatusComponent', () => {
  let component: TeacherDocumentStatusComponent;
  let fixture: ComponentFixture<TeacherDocumentStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherDocumentStatusComponent]
    });
    fixture = TestBed.createComponent(TeacherDocumentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
