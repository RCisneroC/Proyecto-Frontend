import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConfirmPurchaseComponent } from './list-confirm-purchase.component';

describe('ListConfirmPurchaseComponent', () => {
  let component: ListConfirmPurchaseComponent;
  let fixture: ComponentFixture<ListConfirmPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListConfirmPurchaseComponent]
    });
    fixture = TestBed.createComponent(ListConfirmPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
