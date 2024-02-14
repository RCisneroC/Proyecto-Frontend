import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignCurriculunComponent } from './design-curriculun.component';

describe('DesignCurriculunComponent', () => {
  let component: DesignCurriculunComponent;
  let fixture: ComponentFixture<DesignCurriculunComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignCurriculunComponent]
    });
    fixture = TestBed.createComponent(DesignCurriculunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
