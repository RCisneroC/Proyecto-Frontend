import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListscheduleComponent } from './listschedule.component';

describe('ListscheduleComponent', () => {
  let component: ListscheduleComponent;
  let fixture: ComponentFixture<ListscheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListscheduleComponent]
    });
    fixture = TestBed.createComponent(ListscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
