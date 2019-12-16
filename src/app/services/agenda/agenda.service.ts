import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from 'src/environments/environment';
import { HTTP_OPTIONS } from 'src/app/constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(
    private http: HttpClient
  ) {

  }

  public getAgenda({ idcliente }) {
    const body = 
    `{
      agenda(idcliente: ${idcliente}) {
        dia mes ano
        endereco {
          endereco numero complemento pto_referencia
        }
      }
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS);
  }
}
