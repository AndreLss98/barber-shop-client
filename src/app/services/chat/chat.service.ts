import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Socket } from 'ngx-socket-io';

import { chat } from 'src/app/models/chat.model';
import { BASE_URL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private data: chat[] = [
    {
      nome: "Claude Castro",
      conversas: {
        barbeiroMensagens: [
          {
            mensagen: "Olá, boa noite",
            hora: "19:50"
          }
        ],
        minhasMensagens: [
          {
            mensagen: "Olá, Castro",
            hora: "19:50"
          }
        ]
      }
    },
    {
      nome: "Claude Castro",
      conversas: {
        barbeiroMensagens: [
          {
            mensagen: "Olá, boa noite",
            hora: "19:50"
          }
        ],
        minhasMensagens: [
          {
            mensagen: "Olá, Castro",
            hora: "19:50"
          }
        ]
      }
    }
  ]

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private userService: UserService,
  ) {

  }

  public startConnection() {
    this.socket.connect();
  }

  public afterLogin() {
    this.socket.emit('login-cliente', { idcliente: this.userService.user.idcliente });
  }

  public getChats({ idcliente }) {
    const body = 
    `{
      clientChats(idcliente: ${idcliente}) {
        profissional {
          idprofissional nome sobrenome idsocket
        }
      }
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getConversas({ idcliente }, idprofissional: number) {
    const body = 
    `{
      conversas(idcliente: ${idcliente}, idprofissional: ${idprofissional}) {
        iscliente texto
      }
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public sendMessage({ idcliente }, idprofissional: number, texto: string) {
    const body = 
    `mutation {
      sendMessage(idcliente: ${idcliente}, idprofissional: ${idprofissional}, iscliente: true, texto: "${texto}")
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}
