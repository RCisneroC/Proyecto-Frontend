import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartakerDetailInscriptionComponent } from './partaker-detail-inscription-component.component';

describe('PartakerDetailInscriptionComponentComponent', () => {
  let component: PartakerDetailInscriptionComponent;
  let fixture: ComponentFixture<PartakerDetailInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartakerDetailInscriptionComponent]
    });
    fixture = TestBed.createComponent(PartakerDetailInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
