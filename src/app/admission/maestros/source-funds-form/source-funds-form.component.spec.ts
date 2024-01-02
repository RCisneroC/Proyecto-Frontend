import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceFundsFormComponent } from './source-funds-form.component';

describe('SourceFundsFormComponent', () => {
  let component: SourceFundsFormComponent;
  let fixture: ComponentFixture<SourceFundsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SourceFundsFormComponent]
    });
    fixture = TestBed.createComponent(SourceFundsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
