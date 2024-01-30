import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAcademicaComponent } from './info-academica.component';

describe('InfoAcademicaComponent', () => {
  let component: InfoAcademicaComponent;
  let fixture: ComponentFixture<InfoAcademicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoAcademicaComponent]
    });
    fixture = TestBed.createComponent(InfoAcademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
