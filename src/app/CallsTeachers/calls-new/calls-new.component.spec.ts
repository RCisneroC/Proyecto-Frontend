import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsNewComponent } from './calls-new.component';

describe('CallsNewComponent', () => {
  let component: CallsNewComponent;
  let fixture: ComponentFixture<CallsNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallsNewComponent]
    });
    fixture = TestBed.createComponent(CallsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
