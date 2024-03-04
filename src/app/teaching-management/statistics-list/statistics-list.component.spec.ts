import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsListComponent } from './statistics-list.component';

describe('StatisticsListComponent', () => {
  let component: StatisticsListComponent;
  let fixture: ComponentFixture<StatisticsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsListComponent]
    });
    fixture = TestBed.createComponent(StatisticsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
