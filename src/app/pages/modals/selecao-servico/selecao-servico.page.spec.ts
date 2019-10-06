import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoServicoPage } from './selecao-servico.page';

describe('SelecaoServicoPage', () => {
  let component: SelecaoServicoPage;
  let fixture: ComponentFixture<SelecaoServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoServicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
