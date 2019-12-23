import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from '../services/user.service';
import { ChatService } from '../services/chat/chat.service';

@Injectable({
  providedIn: 'root'
})
export class ChatResolverService implements Resolve<any> {

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {

  }

  resolve() {
    return this.chatService.getChats(this.userService.user);
  }

}
