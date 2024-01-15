import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRequeridosComponent } from './document-requeridos.component';

describe('DocumentRequeridosComponent', () => {
  let component: DocumentRequeridosComponent;
  let fixture: ComponentFixture<DocumentRequeridosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentRequeridosComponent]
    });
    fixture = TestBed.createComponent(DocumentRequeridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
