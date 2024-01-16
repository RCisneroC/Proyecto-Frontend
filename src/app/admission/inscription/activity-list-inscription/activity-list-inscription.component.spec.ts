import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListInscriptionComponent } from './activity-list-inscription.component';

describe('ActivityListComponent', () => {
  let component: ActivityListInscriptionComponent;
  let fixture: ComponentFixture<ActivityListInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityListInscriptionComponent]
    });
    fixture = TestBed.createComponent(ActivityListInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
