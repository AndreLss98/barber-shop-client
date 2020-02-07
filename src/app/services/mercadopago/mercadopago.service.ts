import { Injectable } from '@angular/core';

import { MP_ACCESS_TOKEN } from './../../constants/constants';

var mercadoPago = require('mercadopago');

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  private mp;

  constructor(

  ) {
    this.mp = mercadoPago;
  }

  public createPayment() {
    //console.log(Mercadopago);
  }

}
