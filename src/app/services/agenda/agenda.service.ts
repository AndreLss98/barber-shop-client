import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { servico } from 'src/app/models/servico.model';

import { BASE_URL } from 'src/environments/environment';
import { HTTP_OPTIONS } from 'src/app/constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private _newService: servico = new Object() as servico;

  constructor(
    private http: HttpClient
  ) {
    this._newService.servicos = [];
  }

  get newService(): servico {
    return this._newService;
  }

  set newService(servico: servico) {
    this._newService = servico;
  }

  public getAgenda({ idcliente }) {
    const body = 
    `{
      agenda(idcliente: ${idcliente}) {
        dia mes ano valortotal horario
        endereco {
          endereco numero complemento pto_referencia
        }
        servicos {
          nome
        }
        profissional {
          nome sobrenome
        }
      }
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS);
  }

  public sendRequisitionOfService(solicitacao: servico) {
    
  }
}
