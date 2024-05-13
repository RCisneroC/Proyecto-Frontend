import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLocationListComponent } from './asset-location-list.component';

describe('AssetLocationListComponent', () => {
  let component: AssetLocationListComponent;
  let fixture: ComponentFixture<AssetLocationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetLocationListComponent]
    });
    fixture = TestBed.createComponent(AssetLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
