import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDesignComponent } from './curriculum-design.component';

describe('CurriculumDesignComponent', () => {
  let component: CurriculumDesignComponent;
  let fixture: ComponentFixture<CurriculumDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurriculumDesignComponent]
    });
    fixture = TestBed.createComponent(CurriculumDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
