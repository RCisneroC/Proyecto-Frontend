import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsStatusComponent } from './forms-status.component';

describe('FormsStatusComponent', () => {
  let component: FormsStatusComponent;
  let fixture: ComponentFixture<FormsStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsStatusComponent]
    });
    fixture = TestBed.createComponent(FormsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
