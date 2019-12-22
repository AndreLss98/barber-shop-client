import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

import { Historico } from 'src/app/models/historico.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private data: Historico[] = [
    /* {
      dia: 'TER 28 JUL 2019',
      data: [
        {
          barberName: 'Jean Cleber',
          local: 'Rua Recife QD 05 lt 13',
          horas: '08:00',
          valor: 30.0,
        },
        {
          barberName: 'Jean Cleber',
          local: 'Rua Recife QD 05 lt 13',
          horas: '10:00',
          valor: 35.0,
        }
      ]
    },
    {
      dia: 'SEG 28 AGO 2019',
      data: [
        {
          barberName: 'Victor Luiz',
          local: 'Rua São Paulo',
          horas: '10:30',
          valor: 30.0,
        }
      ]
    } */
  ];

  private dataCancelados: Historico[] = [
    {
      dia: 'TER 26 JUL 2019',
      data: [
        {
          barberName: 'Jean Cleber',
          local: 'Rua Recife QD 05 lt 13',
          horas: '',
          valor: null,
        }
      ]
    }
  ];


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
          nome sobrenome
        }
        endereco {
          endereco
        }
      }
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getHistoricoCancelado() {
    
  }

  public rateServie(idservico: number, nota: number) {
    const body = 
    `mutation {
      rateService(idservico: ${idservico}, nota: ${nota})
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

}
