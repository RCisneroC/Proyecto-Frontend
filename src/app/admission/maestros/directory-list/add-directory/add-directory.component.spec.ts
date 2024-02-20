import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDirectoryComponent } from './add-directory.component';

describe('AddDirectoryComponent', () => {
  let component: AddDirectoryComponent;
  let fixture: ComponentFixture<AddDirectoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDirectoryComponent]
    });
    fixture = TestBed.createComponent(AddDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
