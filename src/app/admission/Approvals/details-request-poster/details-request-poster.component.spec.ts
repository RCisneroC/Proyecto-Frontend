import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRequestPosterComponent } from './details-request-poster.component';

describe('DetailsRequestPosterComponent', () => {
  let component: DetailsRequestPosterComponent;
  let fixture: ComponentFixture<DetailsRequestPosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsRequestPosterComponent]
    });
    fixture = TestBed.createComponent(DetailsRequestPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
