import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDegreeCurricularComponent } from './list-degree-curricular.component';

describe('ListDegreeCurricularComponent', () => {
  let component: ListDegreeCurricularComponent;
  let fixture: ComponentFixture<ListDegreeCurricularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDegreeCurricularComponent]
    });
    fixture = TestBed.createComponent(ListDegreeCurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
