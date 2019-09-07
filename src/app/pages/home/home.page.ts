import { Component } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

import mapboxgl from 'mapbox-gl';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MapService } from 'src/app/services/map/map.service';
import { MAPBOX_TOKEN } from './../../../environments/environment';

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
  private map: any;
  private mapObj: any = {};
  private isLoaded: boolean = false;
  private loading: HTMLIonLoadingElement;
  private content: HTMLElement;

  constructor(
    private geolocation: Geolocation,
    private loadinController: LoadingController,
    private alertCtrl: AlertController,
    private mapService: MapService
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
  }

  ionViewDidLoad() {

  }

  private async loadMap() {
    this.openLoading().then(() => {
      this.geolocation.getCurrentPosition(gpsOptions).then((resp) => {
        this.initializeMap(resp.coords.longitude, resp.coords.latitude);
      }).catch((error) => {
        this.closeLoading().then(() => {
          this.showAlert('Desculpe', 'Falha de conexão do gps', 'Não foi possível localiza-lo');
        });
      });
    });
  }

  async initializeMap(longitude: any, latitude: any) {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/dionim/cjzwtgft014k41csdy9xmjcyq',
      center: [longitude, latitude],
      zoom: 13
    });
    this.map.on('load', () => {
      console.log("carregou");
      this.isLoaded = true;
      this.setPosition(longitude, latitude).then(() => {
        this.closeLoading();
      })
    });
    this.map.on('error', () => {
      console.log("falhou");
      this.closeLoading().then(() => {
        this.showAlert('Desculpe', 'Falha de conexão', 'Não foi possível se conectar');
      })
    });
  }

  public async getAtualPosition() {
    return await this.geolocation.getCurrentPosition().then((resp) => {
      return resp.coords;
    })
  }

  private async setPosition(longitude: any, latitude: any) {
    this.map.setCenter([longitude, latitude]);
    await this.markerCurrentPosition(longitude, latitude);
  }

  public centerMap() {
    if (this.isLoaded) {
      this.getAtualPosition().then(data => {
        this.setPosition(data.longitude, data.latitude);
      }).catch(() => {
        this.showAlert('Desculpe', 'Falha no gps', 'Não foi possível localiza-lo');
      });
    } else {
      this.loadMap();
    }
  }

  private async markerCurrentPosition(longitude: any, latitude: any) {
    await new mapboxgl.Marker({ color: '#D6A763' }).setLngLat([longitude, latitude]).addTo(this.map);
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
    })
  }
}
