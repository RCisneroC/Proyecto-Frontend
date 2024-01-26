import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeDetailsComponent } from './degree-details.component';

describe('DegreeDetailsComponent', () => {
  let component: DegreeDetailsComponent;
  let fixture: ComponentFixture<DegreeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DegreeDetailsComponent]
    });
    fixture = TestBed.createComponent(DegreeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
