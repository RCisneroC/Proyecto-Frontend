import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedActivityComponent } from './approved-activity.component';

describe('ApprovedActivityComponent', () => {
  let component: ApprovedActivityComponent;
  let fixture: ComponentFixture<ApprovedActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedActivityComponent]
    });
    fixture = TestBed.createComponent(ApprovedActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
