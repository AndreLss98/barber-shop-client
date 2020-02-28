import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.page.html',
  styleUrls: ['./home-chat.page.scss'],
})
export class HomeChatPage implements OnInit {

  public chats: any[] = [];

  constructor(
    private route: Router,
    public chatService: ChatService,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.data.chats) {
      this.chats = this.activatedRoute.snapshot.data.chats.data.clientChats;
      this.chatService.chats = this.chats;
    }
  }

  public viewChat(pos: number) {
    this.route.navigateByUrl(`home/home-chat/${this.chats[pos].profissional.idprofissional}`);
  }

}
