import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddFormsComponent } from './edit-add-forms.component';

describe('EditAddFormsComponent', () => {
  let component: EditAddFormsComponent;
  let fixture: ComponentFixture<EditAddFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAddFormsComponent]
    });
    fixture = TestBed.createComponent(EditAddFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
