import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFormsComponent } from './status-forms.component';

describe('StatusFormsComponent', () => {
  let component: StatusFormsComponent;
  let fixture: ComponentFixture<StatusFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusFormsComponent]
    });
    fixture = TestBed.createComponent(StatusFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
