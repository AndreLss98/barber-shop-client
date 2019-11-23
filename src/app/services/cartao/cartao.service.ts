import { Injectable } from '@angular/core';
import { card } from 'src/app/models/cartao.model';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  private selectedSessionCard: card = new Object() as card;
  
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

  constructor() {

  }

  public getSessionCard(): card {
    return this.selectedSessionCard;
  }

  public setSelectedCard(card: card) {
    this.selectedSessionCard = card;
  }

  public getCards(): card[] {
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
