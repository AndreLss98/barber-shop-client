import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCartaoPage } from './cadastro-cartao.page';

describe('CadastroCartaoPage', () => {
  let component: CadastroCartaoPage;
  let fixture: ComponentFixture<CadastroCartaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroCartaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCartaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
