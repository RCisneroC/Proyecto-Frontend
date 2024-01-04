import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesListComponent } from './supplies-list.component';

describe('SuppliesListComponent', () => {
  let component: SuppliesListComponent;
  let fixture: ComponentFixture<SuppliesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliesListComponent]
    });
    fixture = TestBed.createComponent(SuppliesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
