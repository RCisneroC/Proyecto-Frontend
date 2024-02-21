import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirnaDirectoraComponent } from './firna-directora.component';

describe('FirnaDirectoraComponent', () => {
  let component: FirnaDirectoraComponent;
  let fixture: ComponentFixture<FirnaDirectoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirnaDirectoraComponent]
    });
    fixture = TestBed.createComponent(FirnaDirectoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
