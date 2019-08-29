import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { IntroModalPage } from '../modals/intro-modal/intro-modal.page';

import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public currentPosition: any;
  private map: any;

  constructor(
    private modalCtrl: ModalController,
    private geolocation: Geolocation
  ) {

  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.openModalPage();
    this.initializeMap();
  }

  ionViewDidEnter() {
    this.getAtualPosition().then(() => {
      this.setPosition();
    });
  }

  private async openModalPage() {
    const modal = await this.modalCtrl.create({
      component: IntroModalPage
    });

    await modal.present();
  }

  private initializeMap(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGlvbmltIiwiYSI6ImNqejA0Mm54OTA0MHkzb3Fpemo5cnhmYWcifQ.gbYcjV1OcISZp1Ym1xw8pw';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/dionim/cjzwtgft014k41csdy9xmjcyq',
      zoom: 12
    });
  }

  private async getAtualPosition() {
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.currentPosition = resp.coords;
    })
  }

  private setPosition() {
    this.map.setCenter([this.currentPosition.longitude, this.currentPosition.latitude]);
    this.markerCurrentPosition();
  }

  private markerCurrentPosition() {
    let marker = new mapboxgl.Marker({color: '#D6A763'}).setLngLat([this.currentPosition.longitude, this.currentPosition.latitude]).addTo(this.map);
    console.log(marker);
  }
}
