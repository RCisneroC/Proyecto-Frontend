import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredDocumentPointsListComponent } from './required-document-points-list.component';

describe('RequiredDocumentPointsListComponent', () => {
  let component: RequiredDocumentPointsListComponent;
  let fixture: ComponentFixture<RequiredDocumentPointsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequiredDocumentPointsListComponent]
    });
    fixture = TestBed.createComponent(RequiredDocumentPointsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
