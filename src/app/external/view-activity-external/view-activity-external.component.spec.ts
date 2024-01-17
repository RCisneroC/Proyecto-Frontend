import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivityExternalComponent } from './view-activity-external.component';

describe('ViewActivityExternalComponent', () => {
  let component: ViewActivityExternalComponent;
  let fixture: ComponentFixture<ViewActivityExternalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewActivityExternalComponent]
    });
    fixture = TestBed.createComponent(ViewActivityExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
