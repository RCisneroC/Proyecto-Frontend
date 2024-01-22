import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveParticipantComponent } from './approve-participant.component';

describe('ApproveParticipantComponent', () => {
  let component: ApproveParticipantComponent;
  let fixture: ComponentFixture<ApproveParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveParticipantComponent]
    });
    fixture = TestBed.createComponent(ApproveParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
