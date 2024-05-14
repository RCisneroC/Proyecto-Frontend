import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestEstateListComponent } from './request-estate-list.component';

describe('RequestEstateListComponent', () => {
  let component: RequestEstateListComponent;
  let fixture: ComponentFixture<RequestEstateListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestEstateListComponent]
    });
    fixture = TestBed.createComponent(RequestEstateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
