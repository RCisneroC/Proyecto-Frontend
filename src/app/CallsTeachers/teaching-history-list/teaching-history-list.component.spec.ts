import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingHistoryListComponent } from './teaching-history-list.component';

describe('TeachingHistoryListComponent', () => {
  let component: TeachingHistoryListComponent;
  let fixture: ComponentFixture<TeachingHistoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachingHistoryListComponent]
    });
    fixture = TestBed.createComponent(TeachingHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
