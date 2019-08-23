import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroModalPage } from './intro-modal.page';

describe('IntroModalPage', () => {
  let component: IntroModalPage;
  let fixture: ComponentFixture<IntroModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
