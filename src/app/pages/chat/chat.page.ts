import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { chat } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public conversas: chat;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    if (this.route.snapshot.data['conversas']) {
      this.conversas = this.route.snapshot.data['conversas']
    }
  }

}
