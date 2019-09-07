import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {


  private data = [
    {
      category: 'MasterCard',
      expDate: '08/22'
    },
    {
      category: 'Visa',
      expDate: '11/21'
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
}
