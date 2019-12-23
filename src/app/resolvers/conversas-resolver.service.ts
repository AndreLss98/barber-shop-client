import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { ChatService } from '../services/chat/chat.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ConversasResolverService implements Resolve<any> {

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
  ) {

  }

  resolve(activatedRouteSnap: ActivatedRouteSnapshot) {
    const idprofissional: number = +activatedRouteSnap.paramMap.get('id');
    return this.chatService.getConversas(this.userService.user, idprofissional);
  }
}
