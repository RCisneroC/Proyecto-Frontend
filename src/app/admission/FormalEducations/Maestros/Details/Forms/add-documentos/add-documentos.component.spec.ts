import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentosComponent } from './add-documentos.component';

describe('AddDocumentosComponent', () => {
  let component: AddDocumentosComponent;
  let fixture: ComponentFixture<AddDocumentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDocumentosComponent]
    });
    fixture = TestBed.createComponent(AddDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
