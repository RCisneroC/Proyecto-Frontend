import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLogoComponent } from './view-logo.component';

describe('ViewLogoComponent', () => {
  let component: ViewLogoComponent;
  let fixture: ComponentFixture<ViewLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLogoComponent]
    });
    fixture = TestBed.createComponent(ViewLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
