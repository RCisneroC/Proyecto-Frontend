import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRequiredFormComponent } from './document-required-form.component';

describe('DocumentRequiredFormComponent', () => {
  let component: DocumentRequiredFormComponent;
  let fixture: ComponentFixture<DocumentRequiredFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentRequiredFormComponent]
    });
    fixture = TestBed.createComponent(DocumentRequiredFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
