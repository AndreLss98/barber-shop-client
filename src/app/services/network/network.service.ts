import { Injectable } from '@angular/core';

import { Network } from '@ionic-native/network/ngx';
import { ModalController } from '@ionic/angular';
import { ConectionStatusPage } from 'src/app/pages/modals/conection-status/conection-status.page';

import { topDownAnimation } from '../../animations/top-down-animation';
import { downTopAnimation } from './../../animations/down-top-animation';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private conectionModal: HTMLIonModalElement;

  constructor(
    private network: Network,
    private modalCtrl: ModalController
  ) {
    
  }

  public initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      this.openModal();
    });

    this.network.onConnect().subscribe(() => {
      this.closeModal();
    });
  }

  private async openModal() {
    this.conectionModal = await this.modalCtrl.create({
      component: ConectionStatusPage,
      enterAnimation: topDownAnimation,
      leaveAnimation: downTopAnimation
    });
    this.conectionModal.present();
  }

  public closeModal(): void {
    if (this.conectionModal) {
      this.conectionModal.dismiss();
    }
  }
}
