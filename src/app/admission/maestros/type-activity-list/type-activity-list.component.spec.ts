import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeActivityListComponent } from './type-activity-list.component';

describe('TypeActivityListComponent', () => {
  let component: TypeActivityListComponent;
  let fixture: ComponentFixture<TypeActivityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeActivityListComponent]
    });
    fixture = TestBed.createComponent(TypeActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
