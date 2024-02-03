import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartakerListInscriptionComponentComponent } from './partaker-list-inscription-component.component';

describe('PartakerListInscriptionComponentComponent', () => {
  let component: PartakerListInscriptionComponentComponent;
  let fixture: ComponentFixture<PartakerListInscriptionComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartakerListInscriptionComponentComponent]
    });
    fixture = TestBed.createComponent(PartakerListInscriptionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
