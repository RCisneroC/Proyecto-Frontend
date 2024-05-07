import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormsForoComponent } from './category-forms-foro.component';

describe('CategoryFormsForoComponent', () => {
  let component: CategoryFormsForoComponent;
  let fixture: ComponentFixture<CategoryFormsForoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryFormsForoComponent]
    });
    fixture = TestBed.createComponent(CategoryFormsForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
