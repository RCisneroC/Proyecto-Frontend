import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoungeListComponent } from './lounge-list.component';

describe('LoungeListComponent', () => {
  let component: LoungeListComponent;
  let fixture: ComponentFixture<LoungeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoungeListComponent]
    });
    fixture = TestBed.createComponent(LoungeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
