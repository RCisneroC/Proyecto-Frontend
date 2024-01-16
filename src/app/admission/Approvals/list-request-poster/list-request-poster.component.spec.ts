import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestPosterComponent } from './list-request-poster.component';

describe('ListRequestPosterComponent', () => {
  let component: ListRequestPosterComponent;
  let fixture: ComponentFixture<ListRequestPosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRequestPosterComponent]
    });
    fixture = TestBed.createComponent(ListRequestPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
