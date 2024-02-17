import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorECCalificationFormComponent } from './tutor-eccalification-form.component';

describe('TutorECCalificationFormComponent', () => {
  let component: TutorECCalificationFormComponent;
  let fixture: ComponentFixture<TutorECCalificationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorECCalificationFormComponent]
    });
    fixture = TestBed.createComponent(TutorECCalificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
