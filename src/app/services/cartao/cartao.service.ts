import { Injectable } from '@angular/core';
import { card } from 'src/app/models/cartao';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {


  private data: card[] = [
    {
      category: 'MasterCard',
      expDate: '08/22',
      cvv: 123,
      numero: '5400000000000000',
      nome: 'Dione Moreira'
    },
    {
      category: 'Visa',
      expDate: '11/21',
      cvv: 123,
      numero: '4716 2077 0506 9985',
      nome: 'Dione Moreira'
    }
  ]

  constructor() { }

  public getCards() {
    return this.data;
  }

  public deleteCard(pos: number) {
    this.data.splice(pos, 1);
    return this.data;
  }

  public addCard(card: card) {
    this.data.push(card);
  }
}
