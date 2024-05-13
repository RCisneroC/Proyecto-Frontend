import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetLocationDetailComponent } from './add-asset-location-detail.component';

describe('AddAssetLocationDetailComponent', () => {
  let component: AddAssetLocationDetailComponent;
  let fixture: ComponentFixture<AddAssetLocationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssetLocationDetailComponent]
    });
    fixture = TestBed.createComponent(AddAssetLocationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
