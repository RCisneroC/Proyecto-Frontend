import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyCashListComponent } from './petty-cash-list.component';

describe('PettyCashListComponent', () => {
  let component: PettyCashListComponent;
  let fixture: ComponentFixture<PettyCashListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PettyCashListComponent]
    });
    fixture = TestBed.createComponent(PettyCashListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
