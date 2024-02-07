import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalifComponent } from './add-calif.component';

describe('AddCalifComponent', () => {
  let component: AddCalifComponent;
  let fixture: ComponentFixture<AddCalifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCalifComponent]
    });
    fixture = TestBed.createComponent(AddCalifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
