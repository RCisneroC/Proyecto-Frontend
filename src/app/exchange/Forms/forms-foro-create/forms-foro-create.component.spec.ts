import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsForoCreateComponent } from './forms-foro-create.component';

describe('FormsForoCreateComponent', () => {
  let component: FormsForoCreateComponent;
  let fixture: ComponentFixture<FormsForoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsForoCreateComponent]
    });
    fixture = TestBed.createComponent(FormsForoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
