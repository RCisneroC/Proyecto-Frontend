import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeggreeCompetenceComponent } from './deggree-competence.component';

describe('DeggreeCompetenceComponent', () => {
  let component: DeggreeCompetenceComponent;
  let fixture: ComponentFixture<DeggreeCompetenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeggreeCompetenceComponent]
    });
    fixture = TestBed.createComponent(DeggreeCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
