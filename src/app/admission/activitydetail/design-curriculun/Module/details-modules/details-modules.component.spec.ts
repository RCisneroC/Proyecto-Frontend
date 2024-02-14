import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsModulesComponent } from './details-modules.component';

describe('DetailsModulesComponent', () => {
  let component: DetailsModulesComponent;
  let fixture: ComponentFixture<DetailsModulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsModulesComponent]
    });
    fixture = TestBed.createComponent(DetailsModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
