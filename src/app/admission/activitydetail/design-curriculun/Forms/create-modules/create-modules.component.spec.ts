import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModulesComponent } from './create-modules.component';

describe('CreateModulesComponent', () => {
  let component: CreateModulesComponent;
  let fixture: ComponentFixture<CreateModulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateModulesComponent]
    });
    fixture = TestBed.createComponent(CreateModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
