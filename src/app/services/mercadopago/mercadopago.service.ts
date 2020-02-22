import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TIPOS_SERVICOS, MP_SUCCESS_URL, MP_ERROR_URL } from 'src/app/constants/constants';

import { AgendaService } from '../agenda/agenda.service';

const HEADERS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': 'application/json' })
}

interface ITEM {
  title: string;
  description: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  constructor(
    private http: HttpClient,
    private agendaService: AgendaService
  ) {
    
  }

  public createPayment() {
    let body = {
      items: [],
      marketplace_fee: this.agendaService.newService.valortotal * 0.2,
      back_urls: {
      success: MP_SUCCESS_URL,
      failure: MP_ERROR_URL
    },
      auto_return: 'approved',
      binary_mode: true
    };
    this.agendaService.newService.servicos.forEach(servico => {
      if (servico.id === TIPOS_SERVICOS.BARBA) {
        body.items.push({
          title: 'Serviço de corte de Barba',
          description: 'prestação de serviço de corte de barba',
          quantity: 1,
          unit_price: this.agendaService.profissionalValues.find(valor => valor.idtiposervico === TIPOS_SERVICOS.BARBA).valor,
          currency_id: "BRL"
        });
      }

      if (servico.id === TIPOS_SERVICOS.CABELO) {
        body.items.push({
          title: 'Serviço de corte de Cabelo',
          description: 'prestação de serviço de corte de cabelo',
          quantity: 1,
          unit_price: this.agendaService.profissionalValues.find(valor => valor.idtiposervico === TIPOS_SERVICOS.CABELO).valor,
          currency_id: "BRL"
        });
      }

      if (servico.id === TIPOS_SERVICOS.BIGODE) {
        body.items.push({
          title: 'Serviço de corte de Bigode',
          description: 'prestação de serviço de corte de bigode',
          quantity: 1,
          unit_price: this.agendaService.profissionalValues.find(valor => valor.idtiposervico === TIPOS_SERVICOS.BIGODE).valor,
          currency_id: "BRL"
        });
      }
    });

    return this.http.post(`https://api.mercadolibre.com/checkout/preferences?access_token=${this.agendaService.newService.accesstoken}`, body, HEADERS);
  }

}
