import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMenuModalComponent } from './view-menu-modal.component';

describe('ViewMenuModalComponent', () => {
  let component: ViewMenuModalComponent;
  let fixture: ComponentFixture<ViewMenuModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMenuModalComponent]
    });
    fixture = TestBed.createComponent(ViewMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
