import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionDesScoreListComponent } from './evaluacion-des-score-list.component';

describe('EvaluacionDesScoreListComponent', () => {
  let component: EvaluacionDesScoreListComponent;
  let fixture: ComponentFixture<EvaluacionDesScoreListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluacionDesScoreListComponent]
    });
    fixture = TestBed.createComponent(EvaluacionDesScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
