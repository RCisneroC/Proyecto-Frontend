import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCreateTaskComponent } from './forms-create-task.component';

describe('FormsCreateTaskComponent', () => {
  let component: FormsCreateTaskComponent;
  let fixture: ComponentFixture<FormsCreateTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsCreateTaskComponent]
    });
    fixture = TestBed.createComponent(FormsCreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
