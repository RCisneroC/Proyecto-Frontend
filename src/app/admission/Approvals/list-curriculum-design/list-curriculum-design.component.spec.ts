import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCurriculumDesignComponent } from './list-curriculum-design.component';

describe('ListCurriculumDesignComponent', () => {
  let component: ListCurriculumDesignComponent;
  let fixture: ComponentFixture<ListCurriculumDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCurriculumDesignComponent]
    });
    fixture = TestBed.createComponent(ListCurriculumDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
