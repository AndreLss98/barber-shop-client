import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificaoSolicitacaoPage } from './notificao-solicitacao.page';

describe('NotificaoSolicitacaoPage', () => {
  let component: NotificaoSolicitacaoPage;
  let fixture: ComponentFixture<NotificaoSolicitacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificaoSolicitacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificaoSolicitacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
