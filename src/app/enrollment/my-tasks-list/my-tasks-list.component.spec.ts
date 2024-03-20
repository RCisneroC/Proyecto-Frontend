import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTasksListComponent } from './my-tasks-list.component';

describe('MyTasksListComponent', () => {
  let component: MyTasksListComponent;
  let fixture: ComponentFixture<MyTasksListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyTasksListComponent]
    });
    fixture = TestBed.createComponent(MyTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
