import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectHistoryComponent } from './subject-history.component';

describe('SubjectHistoryComponent', () => {
  let component: SubjectHistoryComponent;
  let fixture: ComponentFixture<SubjectHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectHistoryComponent]
    });
    fixture = TestBed.createComponent(SubjectHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
