import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRequestEstateComponent } from './details-request-estate.component';

describe('DetailsRequestEstateComponent', () => {
  let component: DetailsRequestEstateComponent;
  let fixture: ComponentFixture<DetailsRequestEstateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsRequestEstateComponent]
    });
    fixture = TestBed.createComponent(DetailsRequestEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
