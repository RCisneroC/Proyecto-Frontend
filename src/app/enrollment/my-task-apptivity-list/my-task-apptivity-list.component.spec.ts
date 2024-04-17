import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskApptivityListComponent } from './my-task-apptivity-list.component';

describe('MyTaskApptivityListComponent', () => {
  let component: MyTaskApptivityListComponent;
  let fixture: ComponentFixture<MyTaskApptivityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyTaskApptivityListComponent]
    });
    fixture = TestBed.createComponent(MyTaskApptivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
