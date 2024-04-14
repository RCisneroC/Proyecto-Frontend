import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceFormsComponent } from './province-forms.component';

describe('ProvinceFormsComponent', () => {
  let component: ProvinceFormsComponent;
  let fixture: ComponentFixture<ProvinceFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvinceFormsComponent]
    });
    fixture = TestBed.createComponent(ProvinceFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
