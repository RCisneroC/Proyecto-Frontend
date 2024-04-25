import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicationsFormsComponent } from './ubications-forms.component';

describe('UbicationsFormsComponent', () => {
  let component: UbicationsFormsComponent;
  let fixture: ComponentFixture<UbicationsFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicationsFormsComponent]
    });
    fixture = TestBed.createComponent(UbicationsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
