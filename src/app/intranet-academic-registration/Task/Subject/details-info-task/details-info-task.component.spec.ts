import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInfoTaskComponent } from './details-info-task.component';

describe('DetailsInfoTaskComponent', () => {
  let component: DetailsInfoTaskComponent;
  let fixture: ComponentFixture<DetailsInfoTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsInfoTaskComponent]
    });
    fixture = TestBed.createComponent(DetailsInfoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
