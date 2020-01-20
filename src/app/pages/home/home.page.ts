import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

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

  private map: HTMLElement;

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService,
    public userService: UserService,
    private geolocation: Geolocation,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {

  }

  ngOnInit() {
    this.configMap();
  }

  ionViewDidEnter() {
    this.mapService.getAddress();
  }

  private configMap() {
    this.map = document.getElementById('map');
    if (this.map) {
      this.mapService.initializeMap(this.map).then(() => {
        this.mapService.map.on('load', () => {
          this.mapService.map.resize();
          this.mapService.markePointers(this.route.snapshot.data.profissionais.data.profissionais);
        })
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
      this.flyToPosition(position.longitude, position.latitude);
    }).catch(() => {
      this.showAlert('Desculpe', 'Falha no gps', 'Não foi possível localiza-lo');
    });
  }

  private flyToPosition(longitude: any, latitude: any): void {
    /* this.mapObj.map.flyTo({ center: [longitude, latitude] });
    this.markerCurrentPosition(longitude, latitude); */
  }

  private async markerCurrentPosition(longitude: any, latitude: any) {
    /* if (this.myPositionMarker) {
      this.myPositionMarker.remove();
    }
    this.myPositionMarker = await new mapboxgl.Marker({ color: '#D6A763' }).setLngLat([longitude, latitude]).addTo(this.mapObj.map); */
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
