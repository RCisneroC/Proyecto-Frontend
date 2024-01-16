import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterRequeridosComponent } from './poster-requeridos.component';

describe('PosterRequeridosComponent', () => {
  let component: PosterRequeridosComponent;
  let fixture: ComponentFixture<PosterRequeridosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosterRequeridosComponent]
    });
    fixture = TestBed.createComponent(PosterRequeridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
