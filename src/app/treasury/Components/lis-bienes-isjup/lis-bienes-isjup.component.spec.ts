import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisBienesIsjupComponent } from './lis-bienes-isjup.component';

describe('LisBienesIsjupComponent', () => {
  let component: LisBienesIsjupComponent;
  let fixture: ComponentFixture<LisBienesIsjupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LisBienesIsjupComponent]
    });
    fixture = TestBed.createComponent(LisBienesIsjupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
