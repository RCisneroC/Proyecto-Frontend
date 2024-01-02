import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeActivityFormComponent } from './type-activity-form.component';

describe('TypeActivityFormComponent', () => {
  let component: TypeActivityFormComponent;
  let fixture: ComponentFixture<TypeActivityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeActivityFormComponent]
    });
    fixture = TestBed.createComponent(TypeActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
