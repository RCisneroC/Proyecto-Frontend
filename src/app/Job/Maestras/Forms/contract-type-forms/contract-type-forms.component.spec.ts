import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTypeFormsComponent } from './contract-type-forms.component';

describe('ContractTypeFormsComponent', () => {
  let component: ContractTypeFormsComponent;
  let fixture: ComponentFixture<ContractTypeFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractTypeFormsComponent]
    });
    fixture = TestBed.createComponent(ContractTypeFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
