import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsDregreeCompetenceComponent } from './forms-dregree-competence.component';

describe('FormsDregreeCompetenceComponent', () => {
  let component: FormsDregreeCompetenceComponent;
  let fixture: ComponentFixture<FormsDregreeCompetenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsDregreeCompetenceComponent]
    });
    fixture = TestBed.createComponent(FormsDregreeCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
