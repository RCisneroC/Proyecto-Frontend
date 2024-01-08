import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionExternalComponent } from './inscription-external.component';

describe('InscriptionExternalComponent', () => {
  let component: InscriptionExternalComponent;
  let fixture: ComponentFixture<InscriptionExternalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscriptionExternalComponent]
    });
    fixture = TestBed.createComponent(InscriptionExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
