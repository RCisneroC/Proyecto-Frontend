import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaskSubjectComponent } from './list-task-subject.component';

describe('ListTaskSubjectComponent', () => {
  let component: ListTaskSubjectComponent;
  let fixture: ComponentFixture<ListTaskSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTaskSubjectComponent]
    });
    fixture = TestBed.createComponent(ListTaskSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
