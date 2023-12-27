import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoungeFormComponent } from './lounge-form.component';

describe('LoungeFormComponent', () => {
  let component: LoungeFormComponent;
  let fixture: ComponentFixture<LoungeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoungeFormComponent]
    });
    fixture = TestBed.createComponent(LoungeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
