import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartakerListInscriptionComponent } from './partaker-list-inscription-component.component';

describe('PartakerListInscriptionComponentComponent', () => {
  let component: PartakerListInscriptionComponent;
  let fixture: ComponentFixture<PartakerListInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartakerListInscriptionComponent]
    });
    fixture = TestBed.createComponent(PartakerListInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
