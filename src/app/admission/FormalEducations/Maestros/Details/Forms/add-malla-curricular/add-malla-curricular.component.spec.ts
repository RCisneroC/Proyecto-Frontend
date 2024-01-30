import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMallaCurricularComponent } from './add-malla-curricular.component';

describe('AddMallaCurricularComponent', () => {
  let component: AddMallaCurricularComponent;
  let fixture: ComponentFixture<AddMallaCurricularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMallaCurricularComponent]
    });
    fixture = TestBed.createComponent(AddMallaCurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
