import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Socket } from 'ngx-socket-io';

import { AgendaService } from '../agenda/agenda.service';

import { BASE_URL } from './../../../environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class ProfissionaisService {

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private agendaService: AgendaService
  ) {

  }

  public getAll() {
    const body =
    `{
      profissionais: acceptedProfissionais {
        nome latitude longitude idsocket idprofissional
        valores {
          valor idtiposervico
        }
      }
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getAllByName(nome: string) {
    const body =
    `{
      profissionaisByName(nome: "${nome}") {
        nome latitude longitude
      }
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public sendRequestViaSocket() {
    this.socket.emit('send-request', this.agendaService.newService);
  }
}
