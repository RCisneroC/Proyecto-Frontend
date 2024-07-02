import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRequestListComponent } from './type-request-list.component';

describe('TypeRequestListComponent', () => {
  let component: TypeRequestListComponent;
  let fixture: ComponentFixture<TypeRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeRequestListComponent]
    });
    fixture = TestBed.createComponent(TypeRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
