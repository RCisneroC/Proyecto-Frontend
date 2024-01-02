import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceFundsListComponent } from './source-funds-list.component';

describe('SourceFundsListComponent', () => {
  let component: SourceFundsListComponent;
  let fixture: ComponentFixture<SourceFundsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SourceFundsListComponent]
    });
    fixture = TestBed.createComponent(SourceFundsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
