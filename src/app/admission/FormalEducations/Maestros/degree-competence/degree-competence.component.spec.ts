import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeCompetenceComponent } from './degree-competence.component';

describe('DegreeCompetenceComponent', () => {
  let component: DegreeCompetenceComponent;
  let fixture: ComponentFixture<DegreeCompetenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DegreeCompetenceComponent]
    });
    fixture = TestBed.createComponent(DegreeCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
