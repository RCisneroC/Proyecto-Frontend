import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityUbicationFormComponent } from './activity-ubication-form.component';

describe('ActivityUbicationFormComponent', () => {
  let component: ActivityUbicationFormComponent;
  let fixture: ComponentFixture<ActivityUbicationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityUbicationFormComponent]
    });
    fixture = TestBed.createComponent(ActivityUbicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
