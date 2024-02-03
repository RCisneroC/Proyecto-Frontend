import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionFormsExternalComponent } from './inscription-forms-external.component';

describe('InscriptionFormsExternalComponent', () => {
  let component: InscriptionFormsExternalComponent;
  let fixture: ComponentFixture<InscriptionFormsExternalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscriptionFormsExternalComponent]
    });
    fixture = TestBed.createComponent(InscriptionFormsExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
