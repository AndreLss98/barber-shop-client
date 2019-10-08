import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAtendimentoPage } from './load-atendimento.page';

describe('LoadAtendimentoPage', () => {
  let component: LoadAtendimentoPage;
  let fixture: ComponentFixture<LoadAtendimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadAtendimentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadAtendimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
