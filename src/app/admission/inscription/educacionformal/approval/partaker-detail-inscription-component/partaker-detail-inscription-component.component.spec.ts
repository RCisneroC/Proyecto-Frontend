import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartakerDetailInscriptionComponentComponent } from './partaker-detail-inscription-component.component';

describe('PartakerDetailInscriptionComponentComponent', () => {
  let component: PartakerDetailInscriptionComponentComponent;
  let fixture: ComponentFixture<PartakerDetailInscriptionComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartakerDetailInscriptionComponentComponent]
    });
    fixture = TestBed.createComponent(PartakerDetailInscriptionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
