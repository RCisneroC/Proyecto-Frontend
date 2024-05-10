import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryForoComponent } from './category-foro.component';

describe('CategoryForoComponent', () => {
  let component: CategoryForoComponent;
  let fixture: ComponentFixture<CategoryForoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryForoComponent]
    });
    fixture = TestBed.createComponent(CategoryForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
