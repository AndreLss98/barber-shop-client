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

  public horarioFormatado: string;

  constructor() {

  }

  ngOnInit() {
    if (this.hora) {
      const date = new Date(Number(this.hora));
      this.horarioFormatado = (date.getHours()) + ':' +  ("0" + date.getMinutes()).substr(-2);
    }
  }

}
