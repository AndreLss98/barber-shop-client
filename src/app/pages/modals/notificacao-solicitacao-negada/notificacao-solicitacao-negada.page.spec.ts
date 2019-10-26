import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacaoSolicitacaoNegadaPage } from './notificacao-solicitacao-negada.page';

describe('NotificacaoSolicitacaoNegadaPage', () => {
  let component: NotificacaoSolicitacaoNegadaPage;
  let fixture: ComponentFixture<NotificacaoSolicitacaoNegadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacaoSolicitacaoNegadaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacaoSolicitacaoNegadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
