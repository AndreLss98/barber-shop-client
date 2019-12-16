import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CalendarioService } from '../calendario/calendario.service';
import { BASE_URL } from 'src/environments/environment';
import { HTTP_OPTIONS } from 'src/app/constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(
    private http: HttpClient,
    private calendarioService: CalendarioService
  ) {

  }

  public getAgenda(idcliente: number) {
    const body = 
    `{
      agenda(idcliente: ${idcliente}) {
        dia mes ano
        endereco {
          endereco numero complemento pto_referencia
        }
      }
    }`;
    this.http.post(BASE_URL, body, HTTP_OPTIONS);
  }
}
