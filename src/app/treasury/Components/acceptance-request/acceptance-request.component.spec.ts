import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceRequestComponent } from './acceptance-request.component';

describe('AcceptanceRequestComponent', () => {
  let component: AcceptanceRequestComponent;
  let fixture: ComponentFixture<AcceptanceRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptanceRequestComponent]
    });
    fixture = TestBed.createComponent(AcceptanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
