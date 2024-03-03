import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosNoOficialesComponent } from './creditos-no-oficiales.component';

describe('CreditosNoOficialesComponent', () => {
  let component: CreditosNoOficialesComponent;
  let fixture: ComponentFixture<CreditosNoOficialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditosNoOficialesComponent]
    });
    fixture = TestBed.createComponent(CreditosNoOficialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
