import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Socket } from 'ngx-socket-io';

import { servico } from 'src/app/models/servico.model';
import { endereco } from './../../models/servico.model';

import { BASE_URL_GRAPHQL } from 'src/environments/environment';
import { TIMEOUT_SIZE } from './../../constants/http-constants';
import { HTTP_OPTIONS } from 'src/app/constants/http-constants';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  public profissionalValues: any[] = [];
  private _agendaCompleta: servico[] = [];
  private _newService: servico = new Object() as servico;

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.initializeNewService();
  }

  private initializeNewService() {
    this._newService.servicos = [];
    this._newService.endereco = new Object() as endereco;
    this._newService.endereco.complemento = '';
    this._newService.endereco.pto_referencia = '';
    this._newService.endereco.numero = null;
  }

  get agendaCompleta(): servico[] {
    return this._agendaCompleta;
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
      agendaCliente(idcliente: ${idcliente}) {
        dia mes ano valortotal horario paymentid
        idservico
        endereco {
          endereco numero complemento pto_referencia
        }
        servicos {
          nome
        }
        profissional {
          nome
        }
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public sendRequisitionOfService(paymentid: string) {
    let strServicos: string = '';
    let numeroField = 'numero: null';
    let complementoField = 'complemento: ""';
    let pto_referenciaField = 'pto_referencia: ""';
    this._newService.servicos.forEach(servico => {
      strServicos += `${servico.id},`;
    });
    strServicos = strServicos.slice(0, -1);
    
    if (this._newService.endereco.numero) {
      numeroField = `numero: ${this._newService.endereco.numero},`
    }
    
    if (this._newService.endereco.complemento) {
      complementoField = `complemento: "${this._newService.endereco.complemento}",`
    }

    if (this._newService.endereco.pto_referencia) {
      pto_referenciaField = `pto_referencia: "${this._newService.endereco.pto_referencia}",`
    }

    const body = 
    `mutation {
      registerService(
        idcliente: ${this.userService.user.idcliente}
        idcartao: ${this._newService.idcartao}
        idprofissional: ${this._newService.idprofissional}
        dia: ${this._newService.dia}
        mes: "${this._newService.mes}"
        ano: ${this._newService.ano}
        horario: "${this._newService.horario}"
        valortotal: ${this._newService.valortotal}
        endereco: "${this._newService.endereco.endereco}",
        paymentid: "${paymentid}",
        ${numeroField}
        ${complementoField}
        ${pto_referenciaField}
        servicos: [${strServicos}])
        {
          dia mes ano valortotal horario idservico
          endereco {
            endereco numero complemento pto_referencia
          }
          servicos {
           nome
          }
          profissional {
            nome
          }
        }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public cancelService(idservico) {
    const body = 
    `
      mutation {
        cancelService(idservico: ${idservico})
      }
    `;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}
