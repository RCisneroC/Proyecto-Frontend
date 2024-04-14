import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationFormsComponent } from './postulation-forms.component';

describe('PostulationFormsComponent', () => {
  let component: PostulationFormsComponent;
  let fixture: ComponentFixture<PostulationFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostulationFormsComponent]
    });
    fixture = TestBed.createComponent(PostulationFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
