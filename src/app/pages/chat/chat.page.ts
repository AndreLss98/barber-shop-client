import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public conversas: any[] = [];
  public message: string = '';
  public idprofissional: number;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
    private actionSheetCtrl: ActionSheetController
  ) {

  }

  ngOnInit() {
    this.idprofissional = +this.route.snapshot.params.id;
    if (this.route.snapshot.data.conversas) {
      this.conversas = this.route.snapshot.data.conversas.data.conversas;
    }
  }

  public deleteChat(): void {
    this.actionSheetCtrl.create({
      header: 'Ao excluir, você perderá todas as mensagens.',
      buttons: [
        {
          text: 'Excluir o chat',
          role: 'destructive'
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ],
      mode: 'ios'
    }).then((action) => {
      action.present();
    });
  }

  public sendMessage() {
    console.log('A funcao foi chamada');
    if (this.message) {
      const tempMessage = this.message;
      this.message = '';
      this.chatService.sendMessage(this.userService.user, this.idprofissional, tempMessage).subscribe((response: any) => {
        if (response.error) {
          console.error(response.error);
        } else {
          console.log(response.data);
          this.conversas.push({ idcliente: this.userService.user.idcliente, idprofissional: this.idprofissional, iscliente: true, texto: tempMessage });
        }
      });
    }
  }

}
