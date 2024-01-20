import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalIncriptionComponent } from './approval-incription.component';

describe('ApprovalIncriptionComponent', () => {
  let component: ApprovalIncriptionComponent;
  let fixture: ComponentFixture<ApprovalIncriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalIncriptionComponent]
    });
    fixture = TestBed.createComponent(ApprovalIncriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
