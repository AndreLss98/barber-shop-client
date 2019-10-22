import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConectionStatusPage } from './conection-status.page';

describe('ConnectionStatusPage', () => {
  let component: ConectionStatusPage;
  let fixture: ComponentFixture<ConectionStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConectionStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConectionStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
