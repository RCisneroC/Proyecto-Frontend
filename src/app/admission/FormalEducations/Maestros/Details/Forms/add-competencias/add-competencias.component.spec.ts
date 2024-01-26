import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompetenciasComponent } from './add-competencias.component';

describe('AddCompetenciasComponent', () => {
  let component: AddCompetenciasComponent;
  let fixture: ComponentFixture<AddCompetenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompetenciasComponent]
    });
    fixture = TestBed.createComponent(AddCompetenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
