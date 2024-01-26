import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePlanAnualComponent } from './detalle-plan-anual.component';

describe('DetallePlanAnualComponent', () => {
  let component: DetallePlanAnualComponent;
  let fixture: ComponentFixture<DetallePlanAnualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallePlanAnualComponent]
    });
    fixture = TestBed.createComponent(DetallePlanAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
