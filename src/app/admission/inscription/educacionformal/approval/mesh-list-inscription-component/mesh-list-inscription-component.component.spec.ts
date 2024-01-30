import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshListInscriptionComponentComponent } from './mesh-list-inscription-component.component';

describe('MeshListInscriptionComponentComponent', () => {
  let component: MeshListInscriptionComponentComponent;
  let fixture: ComponentFixture<MeshListInscriptionComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeshListInscriptionComponentComponent]
    });
    fixture = TestBed.createComponent(MeshListInscriptionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
