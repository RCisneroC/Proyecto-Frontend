import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosOficialesComponent } from './creditos-oficiales.component';

describe('CreditosOficialesComponent', () => {
  let component: CreditosOficialesComponent;
  let fixture: ComponentFixture<CreditosOficialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditosOficialesComponent]
    });
    fixture = TestBed.createComponent(CreditosOficialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
