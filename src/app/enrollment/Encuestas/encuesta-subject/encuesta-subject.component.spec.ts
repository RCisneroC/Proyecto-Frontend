import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaSubjectComponent } from './encuesta-subject.component';

describe('EncuestaSubjectComponent', () => {
  let component: EncuestaSubjectComponent;
  let fixture: ComponentFixture<EncuestaSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaSubjectComponent]
    });
    fixture = TestBed.createComponent(EncuestaSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
