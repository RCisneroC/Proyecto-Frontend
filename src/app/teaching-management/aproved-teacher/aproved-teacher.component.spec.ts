import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovedTeacherComponent } from './aproved-teacher.component';

describe('AprovedTeacherComponent', () => {
  let component: AprovedTeacherComponent;
  let fixture: ComponentFixture<AprovedTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprovedTeacherComponent]
    });
    fixture = TestBed.createComponent(AprovedTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
