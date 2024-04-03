import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFormsComponent } from './job-forms.component';

describe('JobFormsComponent', () => {
  let component: JobFormsComponent;
  let fixture: ComponentFixture<JobFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobFormsComponent]
    });
    fixture = TestBed.createComponent(JobFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
