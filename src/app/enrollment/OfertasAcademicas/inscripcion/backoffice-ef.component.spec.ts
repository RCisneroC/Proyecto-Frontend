import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeEFComponent } from './backoffice-ef.component';

describe('BackofficeEFComponent', () => {
  let component: BackofficeEFComponent;
  let fixture: ComponentFixture<BackofficeEFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackofficeEFComponent]
    });
    fixture = TestBed.createComponent(BackofficeEFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
