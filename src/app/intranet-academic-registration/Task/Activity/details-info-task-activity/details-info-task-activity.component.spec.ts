import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInfoTaskActivityComponent } from './details-info-task-activity.component';

describe('DetailsInfoTaskActivityComponent', () => {
  let component: DetailsInfoTaskActivityComponent;
  let fixture: ComponentFixture<DetailsInfoTaskActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsInfoTaskActivityComponent]
    });
    fixture = TestBed.createComponent(DetailsInfoTaskActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
