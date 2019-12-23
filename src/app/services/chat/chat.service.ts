import { Injectable } from '@angular/core';

import { chat } from 'src/app/models/chat.model';

import { Socket } from 'ngx-socket-io';
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
    private userService: UserService
  ) {

  }

  public startConnection() {
    this.socket.connect();
  }

  public afterLogin() {
    this.socket.emit('login-cliente', { idcliente: this.userService.user.idcliente });
  }

  public getConversas() {
    return this.data;
  }

  public getConvera(pos: number) {
    return this.data[pos];
  }

}
