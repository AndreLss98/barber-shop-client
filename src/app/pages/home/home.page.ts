import { Component } from '@angular/core';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';

import mapboxgl from 'mapbox-gl';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MapService } from 'src/app/services/map/map.service';
import { MAPBOX_TOKEN } from './../../../environments/environment';
import { SelecaoServicoPage } from '../modals/selecao-servico/selecao-servico.page';

const gpsOptions = {
  maximumAge: 2000,
  timeout: 1000,
  enableHighAccuracy: true
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private mapObj: any = {};
  private position;
  private isLoaded: boolean = false;
  private loading: HTMLIonLoadingElement;
  private content: HTMLElement;

  constructor(
    private geolocation: Geolocation,
    private loadinController: LoadingController,
    private alertCtrl: AlertController,
    private mapService: MapService,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {

  }

  ionViewWillEnter() {

  }

  ionViewDidEnter() {
    this.mapObj = this.mapService.getMap();
    this.content = document.querySelector('#content');
    this.content.appendChild(this.mapObj.mapElement);
    this.mapObj.map.resize();
    this.centerMap();
  }

  ionViewDidLoad() {

  }

  public async getAtualPosition() {
    return await this.geolocation.getCurrentPosition().then((resp) => {
      return resp.coords;
    });
  }

  private async setPosition(longitude: any, latitude: any) {
    this.mapObj.map.setCenter([longitude, latitude]);
    await this.markerCurrentPosition(longitude, latitude);
  }

  public centerMap() {
    this.getAtualPosition().then(data => {
      this.setPosition(data.longitude, data.latitude);
    }).catch(() => {
      this.showAlert('Desculpe', 'Falha no gps', 'Não foi possível localiza-lo');
    });
  }

  private async markerCurrentPosition(longitude: any, latitude: any) {
    await new mapboxgl.Marker({ color: '#D6A763' }).setLngLat([longitude, latitude]).addTo(this.mapObj.map);
  }

  private async openLoading() {
    await this.loadinController.create({
      message: 'Carregando mapa...'
    }).then(res => {
      this.loading = res;
      this.loading.present();
    });
  }

  private async closeLoading() {
    await this.loading.dismiss();
  }

  private async showAlert(header: string, subHeader: string, message: string) {
    this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: "Ok",
          handler: () => {

          }
        }
      ],
      backdropDismiss: false
    }).then((res) => {
      res.present();
    });
  }

  public clickEvent(event) {
    if ((event.target.attributes.length !== 0) && (event.target.attributes[0].value === 'round')) {
      this.modalCtrl.create({
        component: SelecaoServicoPage
      }).then((modal) => {
        modal.present();
      });
    }
  }
}
