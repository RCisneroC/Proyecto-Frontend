import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesListFormComponent } from './supplies-list-form.component';

describe('SuppliesListFormComponent', () => {
  let component: SuppliesListFormComponent;
  let fixture: ComponentFixture<SuppliesListFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliesListFormComponent]
    });
    fixture = TestBed.createComponent(SuppliesListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
