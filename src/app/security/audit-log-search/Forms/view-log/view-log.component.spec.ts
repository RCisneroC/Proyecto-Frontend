import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLogComponent } from './view-log.component';

describe('ViewLogComponent', () => {
  let component: ViewLogComponent;
  let fixture: ComponentFixture<ViewLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLogComponent]
    });
    fixture = TestBed.createComponent(ViewLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
