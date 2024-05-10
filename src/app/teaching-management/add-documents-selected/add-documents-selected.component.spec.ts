import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentsSelectedComponent } from './add-documents-selected.component';

describe('AddDocumentsSelectedComponent', () => {
  let component: AddDocumentsSelectedComponent;
  let fixture: ComponentFixture<AddDocumentsSelectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDocumentsSelectedComponent]
    });
    fixture = TestBed.createComponent(AddDocumentsSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
