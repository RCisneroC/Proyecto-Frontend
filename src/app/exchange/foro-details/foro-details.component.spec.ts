import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoDetailsComponent } from './foro-details.component';

describe('ForoDetailsComponent', () => {
  let component: ForoDetailsComponent;
  let fixture: ComponentFixture<ForoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForoDetailsComponent]
    });
    fixture = TestBed.createComponent(ForoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
