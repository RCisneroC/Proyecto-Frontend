import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTypeComponent } from './contract-type.component';

describe('ContractTypeComponent', () => {
  let component: ContractTypeComponent;
  let fixture: ComponentFixture<ContractTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractTypeComponent]
    });
    fixture = TestBed.createComponent(ContractTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
