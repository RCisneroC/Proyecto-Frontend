import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaskActivityComponent } from './list-task-activity.component';

describe('ListTaskActivityComponent', () => {
  let component: ListTaskActivityComponent;
  let fixture: ComponentFixture<ListTaskActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTaskActivityComponent]
    });
    fixture = TestBed.createComponent(ListTaskActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
