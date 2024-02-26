import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsAsignedRolesComponent } from './forms-asigned-roles.component';

describe('FormsAsignedRolesComponent', () => {
  let component: FormsAsignedRolesComponent;
  let fixture: ComponentFixture<FormsAsignedRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsAsignedRolesComponent]
    });
    fixture = TestBed.createComponent(FormsAsignedRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
