import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPosterComponent } from './list-poster.component';

describe('ListPosterComponent', () => {
  let component: ListPosterComponent;
  let fixture: ComponentFixture<ListPosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPosterComponent]
    });
    fixture = TestBed.createComponent(ListPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
