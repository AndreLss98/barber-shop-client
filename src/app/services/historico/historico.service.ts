import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL_GRAPHQL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  constructor(
    private http: HttpClient
  ) {

  }

  public getHistorico({ idcliente }) {
    const body = 
    `{
      clienteServices(idcliente: ${idcliente}) {
        idservico
        dia mes ano horario
        valortotal nota
        profissional {
          nome imgperfil
        }
        endereco {
          endereco
        }
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getHistoricoCancelado({ idcliente }) {
    const body = 
    `{
      clientCanceledService(idcliente: ${idcliente}) {
        dia mes ano valortotal horario
        profissional {
          nome imgperfil
        }
        endereco {
          endereco
        }
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public rateServie(idservico: number, nota: number) {
    const body = 
    `mutation {
      rateService(idservico: ${idservico}, nota: ${nota})
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

}
