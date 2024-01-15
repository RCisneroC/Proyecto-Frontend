import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPosterComponent } from './view-poster.component';

describe('ViewPosterComponent', () => {
  let component: ViewPosterComponent;
  let fixture: ComponentFixture<ViewPosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPosterComponent]
    });
    fixture = TestBed.createComponent(ViewPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
