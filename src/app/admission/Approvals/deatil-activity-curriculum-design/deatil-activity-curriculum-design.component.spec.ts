import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatilActivityCurriculumDesignComponent } from './deatil-activity-curriculum-design.component';

describe('DeatilActivityCurriculumDesignComponent', () => {
  let component: DeatilActivityCurriculumDesignComponent;
  let fixture: ComponentFixture<DeatilActivityCurriculumDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeatilActivityCurriculumDesignComponent]
    });
    fixture = TestBed.createComponent(DeatilActivityCurriculumDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
