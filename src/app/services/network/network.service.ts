import { Injectable } from '@angular/core';

import { Network } from '@ionic-native/network/ngx';
import { ModalController } from '@ionic/angular';
import { ConnectionStatusPage } from 'src/app/pages/modals/connection-status/connection-status.page';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(
    private network: Network,
    private modalCtrl: ModalController
  ) {
    
  }

  public initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      console.log('Internet caiu');
      this.modalCtrl.create({component: ConnectionStatusPage}).then((modal) => modal.present());
    });

    this.network.onConnect().subscribe(() => {
      console.log('Internet voltou');
      this.modalCtrl.dismiss();
    });
  }
}
