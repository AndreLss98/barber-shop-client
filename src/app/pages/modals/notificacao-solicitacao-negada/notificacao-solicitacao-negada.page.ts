import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacao-solicitacao-negada',
  templateUrl: './notificacao-solicitacao-negada.page.html',
  styleUrls: ['./notificacao-solicitacao-negada.page.scss'],
})
export class NotificacaoSolicitacaoNegadaPage implements OnInit {

  constructor(private modalCtrl: ModalController) {

  }

  ngOnInit() {

  }

  public closeModal(): void {
    this.modalCtrl.dismiss();
  }
}
