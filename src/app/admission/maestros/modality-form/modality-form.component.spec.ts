import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalityFormComponent } from './modality-form.component';

describe('ModalityFormComponent', () => {
  let component: ModalityFormComponent;
  let fixture: ComponentFixture<ModalityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalityFormComponent]
    });
    fixture = TestBed.createComponent(ModalityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
