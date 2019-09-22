import { Injectable } from '@angular/core';
import { ChatService } from '../services/chat/chat.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatResolveService implements Resolve<any> {

  constructor(private chatService: ChatService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    let id = +route.paramMap.get('id');
    return this.chatService.getConvera(id);
  }

}
