import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCallForApplyComponent } from './view-call-for-apply.component';

describe('ViewCallForApplyComponent', () => {
  let component: ViewCallForApplyComponent;
  let fixture: ComponentFixture<ViewCallForApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCallForApplyComponent]
    });
    fixture = TestBed.createComponent(ViewCallForApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
