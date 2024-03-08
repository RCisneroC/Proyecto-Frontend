import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadActivityAllComponent } from './upload-activity-all.component';

describe('UploadActivityAllComponent', () => {
  let component: UploadActivityAllComponent;
  let fixture: ComponentFixture<UploadActivityAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadActivityAllComponent]
    });
    fixture = TestBed.createComponent(UploadActivityAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
