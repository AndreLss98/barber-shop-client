import { Component } from '@angular/core';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';

import mapboxgl from 'mapbox-gl';
import { UserService } from 'src/app/services/user.service';
import { MapService } from 'src/app/services/map/map.service';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';

import { topDownAnimation } from 'src/app/animations/top-down-animation';
import { downTopAnimation } from 'src/app/animations/down-top-animation';

import { SelecaoServicoPage } from '../modals/selecao-servico/selecao-servico.page';
import { NotificacaoSolicitacaoNegadaPage } from '../modals/notificacao-solicitacao-negada/notificacao-solicitacao-negada.page';

import { CustomMenuComponent } from '../modals/custom-menu/custom-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private mapObj: any = {};
  private content: HTMLElement;
  private myPositionMarker: any;

  constructor(
    private mapService: MapService,
    private geolocation: Geolocation,
    private userService: UserService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {

  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.checkMap();
  }

  public checkMap(): void {
    this.mapObj = this.mapService.getMap();
    if (this.mapObj) {
      this.content = document.querySelector('#content');
      this.content.appendChild(this.mapObj.mapElement);
      this.mapObj.map.resize();
      this.setMyPosition();
    } else {
      this.mapService.initializeMap().then((response) => {
        this.mapObj = this.mapService.getMap();
        this.content = document.querySelector('#content');
        this.content.appendChild(this.mapObj.mapElement);
        this.mapObj.map.resize();
        this.setMyPosition();
      });
    }
  }

  public async getAtualPosition() {

    const gpsOptions: GeolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 15000,
      timeout: 10000
    }

    return await this.geolocation.getCurrentPosition(gpsOptions).then((resp) => {
      return resp.coords;
    });
  }

  public setMyPosition(): void {
    this.getAtualPosition().then(position => {
      this.userService.updateUserPosition(position).subscribe((response) => {
        console.log(response);
        this.flyToPosition(position.longitude, position.latitude);
      }, (error) => console.log(error));
    }).catch(() => {
      this.showAlert('Desculpe', 'Falha no gps', 'Não foi possível localiza-lo');
    });
  }

  private flyToPosition(longitude: any, latitude: any): void {
    this.mapObj.map.flyTo({ center: [longitude, latitude] });
    this.markerCurrentPosition(longitude, latitude);
  }

  private async markerCurrentPosition(longitude: any, latitude: any) {
    if (this.myPositionMarker) {
      this.myPositionMarker.remove();
    }
    this.myPositionMarker = await new mapboxgl.Marker({ color: '#D6A763' }).setLngLat([longitude, latitude]).addTo(this.mapObj.map);
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
        component: SelecaoServicoPage,
        mode: 'ios'
      }).then((modal) => {
        modal.present();
      });
    }
  }

  public openMenu(): void {
    this.modalCtrl.create({
      component: CustomMenuComponent,
      enterAnimation: topDownAnimation,
      leaveAnimation: downTopAnimation
    }).then((modal) => modal.present());
  }
}
