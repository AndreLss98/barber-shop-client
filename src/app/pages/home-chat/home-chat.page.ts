import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { chat } from 'src/app/models/chat.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.page.html',
  styleUrls: ['./home-chat.page.scss'],
})
export class HomeChatPage implements OnInit {

  public conversas: chat[];

  constructor(
    private chatService: ChatService,
    private route: Router
  ) {

  }

  ngOnInit() {
    this.conversas = this.chatService.getConversas();
  }

  public viewChat(pos: number) {
    this.route.navigateByUrl(`home/home-chat/${pos}`);
  }

}
