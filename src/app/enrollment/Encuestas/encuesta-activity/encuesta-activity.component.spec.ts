import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaActivityComponent } from './encuesta-activity.component';

describe('EncuestaActivityComponent', () => {
  let component: EncuestaActivityComponent;
  let fixture: ComponentFixture<EncuestaActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaActivityComponent]
    });
    fixture = TestBed.createComponent(EncuestaActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
