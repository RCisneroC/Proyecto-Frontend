import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogSearchComponent } from './audit-log-search.component';

describe('AuditLogSearchComponent', () => {
  let component: AuditLogSearchComponent;
  let fixture: ComponentFixture<AuditLogSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditLogSearchComponent]
    });
    fixture = TestBed.createComponent(AuditLogSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
