import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovedCallsTeachersComponent } from './aproved-calls-teachers.component';

describe('AprovedCallsTeachersComponent', () => {
  let component: AprovedCallsTeachersComponent;
  let fixture: ComponentFixture<AprovedCallsTeachersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprovedCallsTeachersComponent]
    });
    fixture = TestBed.createComponent(AprovedCallsTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
