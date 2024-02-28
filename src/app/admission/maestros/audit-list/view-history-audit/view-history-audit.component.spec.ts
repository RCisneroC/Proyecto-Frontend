import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoryAuditComponent } from './view-history-audit.component';

describe('ViewHistoryAuditComponent', () => {
  let component: ViewHistoryAuditComponent;
  let fixture: ComponentFixture<ViewHistoryAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHistoryAuditComponent]
    });
    fixture = TestBed.createComponent(ViewHistoryAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
