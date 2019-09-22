import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-item',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  @Input() nome: string;
  @Input() ulitmaMensagem: string;
  @Input() hora: string;

  constructor() {

  }

  ngOnInit() {

  }

}
