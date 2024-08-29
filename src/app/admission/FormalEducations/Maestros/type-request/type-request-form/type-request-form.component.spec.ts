import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRequestFormComponent } from './type-request-form.component';

describe('TypeRequestFormComponent', () => {
  let component: TypeRequestFormComponent;
  let fixture: ComponentFixture<TypeRequestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeRequestFormComponent]
    });
    fixture = TestBed.createComponent(TypeRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
