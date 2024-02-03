import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredDocumentFormComponent } from './required-document-form.component';

describe('RequiredDocumentFormComponent', () => {
  let component: RequiredDocumentFormComponent;
  let fixture: ComponentFixture<RequiredDocumentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequiredDocumentFormComponent]
    });
    fixture = TestBed.createComponent(RequiredDocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
