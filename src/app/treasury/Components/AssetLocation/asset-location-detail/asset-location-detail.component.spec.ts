import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLocationDetailComponent } from './asset-location-detail.component';

describe('AssetLocationDetailComponent', () => {
  let component: AssetLocationDetailComponent;
  let fixture: ComponentFixture<AssetLocationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetLocationDetailComponent]
    });
    fixture = TestBed.createComponent(AssetLocationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
