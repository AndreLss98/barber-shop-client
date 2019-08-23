import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { IntroModalPage } from '../modals/intro-modal/intro-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private modalCtrl: ModalController
  ) {

  }


  ionViewWillEnter() {
   this.openModalPage();
  }

  private async openModalPage() {
    const modal = await this.modalCtrl.create({
      component: IntroModalPage
    });

    await modal.present();
  }
}
