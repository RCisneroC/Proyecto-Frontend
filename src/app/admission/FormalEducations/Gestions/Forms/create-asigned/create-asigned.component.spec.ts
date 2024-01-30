import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAsignedComponent } from './create-asigned.component';

describe('CreateAsignedComponent', () => {
  let component: CreateAsignedComponent;
  let fixture: ComponentFixture<CreateAsignedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAsignedComponent]
    });
    fixture = TestBed.createComponent(CreateAsignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
