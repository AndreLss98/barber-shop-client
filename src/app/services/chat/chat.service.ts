import { Subscription } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Socket } from 'ngx-socket-io';

import { chat, conversa } from 'src/app/models/chat.model';
import { BASE_URL_GRAPHQL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _chats: chat[] = [];
  private _currentChat: chat = new Object() as chat;

  private messageListener: Subscription;
  private connectionListener: Subscription;
  
  constructor(
    private socket: Socket,
    private http: HttpClient,
    private userService: UserService,
  ) {
    
  }

  get chats(): chat[] {
    return this._chats;
  }

  set chats(chats: chat[]) {
    this._chats = chats;
  }

  get currentChat(): chat {
    return this._currentChat;
  }

  set currentChat(chat: chat) {
    this._currentChat = chat;
  }

  public setConversas(conversas: conversa[], idprofissional: number) {
    this._chats.forEach(chat => {
        if (chat.profissional.idprofissional === idprofissional) {
          chat.conversas = conversas;
          return;
        }
    });
  }

  public getCurrentChat(idprofissional: number): chat {
    this.currentChat = this._chats.find(chat => chat.profissional.idprofissional === idprofissional);
    return this.currentChat;
  }

  public startConnection() {
    this.socket.connect();
  }

  public afterLogin() {
    this.socket.emit('login-cliente', { idcliente: this.userService.user.idcliente });
    this.messageListener = this.socket.fromEvent('private-message').subscribe((message: any) => {
      this._chats.find(chat => chat.profissional.idprofissional === message.idprofissional).conversas.push({ idprofissional: message.idprofissional, idcliente: this.userService.user.idcliente, iscliente: false, texto: message.texto, dthorario: message.dthorario });
    });
  }

  public getChats({ idcliente }) {
    const body = 
    `{
      clientChats(idcliente: ${idcliente}) {
        profissional {
          idprofissional nome
        }
        conversas {
          iscliente texto dthorario
        }
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getConversas({ idcliente }, idprofissional: number) {
    const body = 
    `{
      conversas(idcliente: ${idcliente}, idprofissional: ${idprofissional}) {
        iscliente texto dthorario
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public sendMessage({ idcliente }, idprofissional: number, texto: string) {
    const body = 
    `mutation {
      sendMessage(idcliente: ${idcliente}, idprofissional: ${idprofissional}, iscliente: true, texto: "${texto}") {
        idprofissional idcliente iscliente dthorario texto
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public sendMessageViaSocket(message: any) {
    this.socket.emit('client-send-private-message', message);
  }
}
