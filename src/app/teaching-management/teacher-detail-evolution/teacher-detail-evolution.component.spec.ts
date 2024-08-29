import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDetailEvolutionComponent } from './teacher-detail-evolution.component';

describe('TeacherDetailEvolutionComponent', () => {
  let component: TeacherDetailEvolutionComponent;
  let fixture: ComponentFixture<TeacherDetailEvolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherDetailEvolutionComponent]
    });
    fixture = TestBed.createComponent(TeacherDetailEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
