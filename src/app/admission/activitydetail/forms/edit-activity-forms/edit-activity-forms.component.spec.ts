import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActivityFormsComponent } from './edit-activity-forms.component';

describe('EditActivityFormsComponent', () => {
  let component: EditActivityFormsComponent;
  let fixture: ComponentFixture<EditActivityFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditActivityFormsComponent]
    });
    fixture = TestBed.createComponent(EditActivityFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
