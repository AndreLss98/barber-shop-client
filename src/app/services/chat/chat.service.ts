import { Injectable } from '@angular/core';

import { chat } from 'src/app/models/chat.model';

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

  constructor() { }

  public getConversas() {
    return this.data;
  }

  public getConvera(pos: number) {
    return this.data[pos];
  }

}
