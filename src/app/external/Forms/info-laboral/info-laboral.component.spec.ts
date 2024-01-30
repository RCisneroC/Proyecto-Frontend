import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLaboralComponent } from './info-laboral.component';

describe('InfoLaboralComponent', () => {
  let component: InfoLaboralComponent;
  let fixture: ComponentFixture<InfoLaboralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoLaboralComponent]
    });
    fixture = TestBed.createComponent(InfoLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
