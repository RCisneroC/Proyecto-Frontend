import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRequiredListComponent } from './document-required-list.component';

describe('DocumentRequiredListComponent', () => {
  let component: DocumentRequiredListComponent;
  let fixture: ComponentFixture<DocumentRequiredListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentRequiredListComponent]
    });
    fixture = TestBed.createComponent(DocumentRequiredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
