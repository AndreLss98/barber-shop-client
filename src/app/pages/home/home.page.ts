import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { IntroModalPage } from '../modals/intro-modal/intro-modal.page';

import mapboxgl  from 'mapbox-gl';

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

  ngOnInit() {
    
  }

  ionViewWillEnter() {
   this.openModalPage();
  this.initializeMap();
  }

  private async openModalPage() {
    const modal = await this.modalCtrl.create({
      component: IntroModalPage
    });

    await modal.present();
  }

  private initializeMap(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGlvbmltIiwiYSI6ImNqejA0Mm54OTA0MHkzb3Fpemo5cnhmYWcifQ.gbYcjV1OcISZp1Ym1xw8pw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/dionim/cjzwtgft014k41csdy9xmjcyq'
    });
  }
}
