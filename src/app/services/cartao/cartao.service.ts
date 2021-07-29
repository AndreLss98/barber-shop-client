import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { cartao } from './../../models/cliente.model';

import creditCardType from 'credit-card-type';

import { BASE_URL_GRAPHQL } from '../../../environments/environment'
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  private _selectedSessionCard: cartao = new Object() as cartao;

  private _localCards: cartao[] = [];

  constructor(
    private http: HttpClient
  ) {

  }

  get localCards(): cartao[] {
    return this._localCards;
  }

  set localCards(userCards: cartao[]) {
    this._localCards = this.getBandeiras(userCards);
    this._selectedSessionCard = this._localCards[0];
  }

  get selectedSessionCard(): cartao {
    return this._selectedSessionCard;
  }

  set selectedSessionCard(card: cartao) {
    this._selectedSessionCard = card;
  }

  public updateLocalCards(card: cartao) {
    const tempCard = this.getBandeiras([card]);
    this._localCards.unshift(tempCard[0]);
    this.setSelectedCard(this._localCards[0]);
  }

  public getSessionCard(): cartao {
    return this._selectedSessionCard;
  }

  public setSelectedCard(card: cartao) {
    this._selectedSessionCard = card;
  }

  public deleteCard(pos: number, { idcliente }, { idcartao }) {
    const body =
      `mutation {
        deleteCard(idcliente: ${idcliente}, idcartao: ${idcartao})
      }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getCards(idcliente: number) {
    const body = 
    `{
      cartoesCliente(idcliente: ${idcliente}) {
        idcartao nome numero cvv datavalidade
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public registerCard({ idcliente }, newCard: cartao) {
    newCard.numero = newCard.numero.replace(/[\s]/g, '');
    const body =
    `mutation {
      registerCard(idcliente: ${idcliente}, numero: "${newCard.numero}", nome: "${newCard.nome}", cvv: ${newCard.cvv}, datavalidade: "${newCard.datavalidade}") {
        idcartao numero nome datavalidade cvv
      }
    }`;

    console.log(body);
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getBandeiras(listaCartoes: cartao[]): cartao[] {
    listaCartoes.forEach(cartao => {
      if (cartao.numero && cartao.numero.length >= 4) {
        this.showBandeira(creditCardType(cartao.numero.substring(0, 4)), cartao);
      }
    });
    return listaCartoes;
  }

  public showBandeira(dadosCartao, cartao: cartao) {
    if (dadosCartao && dadosCartao.length > 0) {
      if (dadosCartao[0].type === "visa") {
        cartao.category = "Visa";
      } else if (dadosCartao[0].type === "mastercard") {
        cartao.category = "MasterCard";
      }
    }
  }
}
