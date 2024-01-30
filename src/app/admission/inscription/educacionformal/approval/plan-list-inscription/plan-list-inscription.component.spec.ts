import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanListInscriptionComponent } from './plan-list-inscription.component';

describe('PlanListInscriptionComponent', () => {
  let component: PlanListInscriptionComponent;
  let fixture: ComponentFixture<PlanListInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanListInscriptionComponent]
    });
    fixture = TestBed.createComponent(PlanListInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
