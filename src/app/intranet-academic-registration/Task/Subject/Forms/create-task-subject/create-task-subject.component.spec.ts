import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskSubjectComponent } from './create-task-subject.component';

describe('CreateTaskSubjectComponent', () => {
  let component: CreateTaskSubjectComponent;
  let fixture: ComponentFixture<CreateTaskSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTaskSubjectComponent]
    });
    fixture = TestBed.createComponent(CreateTaskSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
