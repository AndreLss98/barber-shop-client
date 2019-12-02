import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { card } from 'src/app/models/cartao.model';

import creditCardType from 'credit-card-type';

import { BASE_URL } from '../../../environments/environment'
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  private selectedSessionCard: card = new Object() as card;
  
  private data: card[] = [];

  constructor(
    private http: HttpClient
  ) {

  }

  public getSessionCard(): card {
    return this.selectedSessionCard;
  }

  public setSelectedCard(card: card) {
    this.selectedSessionCard = card;
  }

  public getFakeCards(): card[] {
    return this.data;
  }

  public deleteCard(pos: number) {
    this.data.splice(pos, 1);
    return this.data;
  }

  public addCard(card: card) {
    this.data.push(card);
  }

  public getCards(idcliente: number) {
    const body = `{cartoesCliente(idcliente: ${idcliente}){idcartao nome numero cvv datavalidade }}`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getBandeiras(listaCartoes: card[]): card[] {
    listaCartoes.forEach(cartao => {
      let numeroBandeira;
      if (cartao.numero && cartao.numero.length >= 4) {
        numeroBandeira = cartao.numero.substring(0, 4);
        this.showBandeira(creditCardType(numeroBandeira), cartao);
      }
    });
    return listaCartoes;
  }

  public showBandeira(dadosCartao, cartao: card) {
    if (dadosCartao && dadosCartao.length > 0) {
      if (dadosCartao[0].type === "visa") {
        cartao.category = "Visa";
      } else if (dadosCartao[0].type === "mastercard") {
        cartao.category = "MasterCard";
      }
    }
  }
}
