import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAnnualComponent } from './details-annual.component';

describe('DetailsAnnualComponent', () => {
  let component: DetailsAnnualComponent;
  let fixture: ComponentFixture<DetailsAnnualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsAnnualComponent]
    });
    fixture = TestBed.createComponent(DetailsAnnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
