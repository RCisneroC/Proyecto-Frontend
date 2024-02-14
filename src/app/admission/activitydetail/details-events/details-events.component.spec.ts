import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEventsComponent } from './details-events.component';

describe('DetailsEventsComponent', () => {
  let component: DetailsEventsComponent;
  let fixture: ComponentFixture<DetailsEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsEventsComponent]
    });
    fixture = TestBed.createComponent(DetailsEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
