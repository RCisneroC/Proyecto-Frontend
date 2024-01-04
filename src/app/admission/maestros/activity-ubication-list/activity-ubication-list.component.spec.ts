import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityUbicationListComponent } from './activity-ubication-list.component';

describe('ActivityUbicationListComponent', () => {
  let component: ActivityUbicationListComponent;
  let fixture: ComponentFixture<ActivityUbicationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityUbicationListComponent]
    });
    fixture = TestBed.createComponent(ActivityUbicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
