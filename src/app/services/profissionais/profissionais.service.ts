import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Socket } from 'ngx-socket-io';

import { AgendaService } from '../agenda/agenda.service';

import { BASE_URL_GRAPHQL } from './../../../environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfissionaisService {

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private userService: UserService,
    private agendaService: AgendaService,
  ) {

  }

  public getAll() {
    const body =
    `{
      profissionais: acceptedProfissionais {
        nome latitude longitude idprofissional imgperfil accesstoken
        valores {
          valor idtiposervico
        }
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getAllByName(nome: string) {
    const body =
    `{
      profissionaisByName(nome: "${nome}") {
        nome latitude longitude
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public sendRequestViaSocket(idservico: number) {
    const request = {...this.agendaService.newService, nome: this.userService.user.nome, imgperfil: this.userService.user.imgperfil, idservico};
    console.log(request);
    this.socket.emit('send-request', request);
  }
}
