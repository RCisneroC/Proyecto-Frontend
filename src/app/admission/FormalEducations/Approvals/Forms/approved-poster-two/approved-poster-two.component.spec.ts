import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPosterTwoComponent } from './approved-poster-two.component';

describe('ApprovedPosterTwoComponent', () => {
  let component: ApprovedPosterTwoComponent;
  let fixture: ComponentFixture<ApprovedPosterTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedPosterTwoComponent]
    });
    fixture = TestBed.createComponent(ApprovedPosterTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
