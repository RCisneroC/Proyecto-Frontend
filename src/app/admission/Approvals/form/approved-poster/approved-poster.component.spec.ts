import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPosterComponent } from './approved-poster.component';

describe('ApprovedPosterComponent', () => {
  let component: ApprovedPosterComponent;
  let fixture: ComponentFixture<ApprovedPosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedPosterComponent]
    });
    fixture = TestBed.createComponent(ApprovedPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
