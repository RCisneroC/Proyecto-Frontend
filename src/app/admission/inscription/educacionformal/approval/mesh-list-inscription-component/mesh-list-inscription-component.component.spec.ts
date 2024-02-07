import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshListInscriptionComponent } from './mesh-list-inscription-component.component';

describe('MeshListInscriptionComponentComponent', () => {
  let component: MeshListInscriptionComponent;
  let fixture: ComponentFixture<MeshListInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeshListInscriptionComponent]
    });
    fixture = TestBed.createComponent(MeshListInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
