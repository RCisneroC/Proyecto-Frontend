import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredDocumentListComponent } from './required-document-list.component';

describe('RequiredDocumentListComponent', () => {
  let component: RequiredDocumentListComponent;
  let fixture: ComponentFixture<RequiredDocumentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequiredDocumentListComponent]
    });
    fixture = TestBed.createComponent(RequiredDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
