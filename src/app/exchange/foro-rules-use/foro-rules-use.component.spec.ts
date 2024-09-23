import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoRulesUseComponent } from './foro-rules-use.component';

describe('ForoRulesUseComponent', () => {
  let component: ForoRulesUseComponent;
  let fixture: ComponentFixture<ForoRulesUseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForoRulesUseComponent]
    });
    fixture = TestBed.createComponent(ForoRulesUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
