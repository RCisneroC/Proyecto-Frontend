import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCooperatingOrganizationComponent } from './list-cooperating-organization.component';

describe('ListCooperatingOrganizationComponent', () => {
  let component: ListCooperatingOrganizationComponent;
  let fixture: ComponentFixture<ListCooperatingOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCooperatingOrganizationComponent]
    });
    fixture = TestBed.createComponent(ListCooperatingOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
