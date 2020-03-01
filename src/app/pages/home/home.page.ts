import { fromEvent } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AlertController, ModalController } from '@ionic/angular';

import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';

import { UserService } from 'src/app/services/user.service';
import { MapService } from 'src/app/services/map/map.service';
import { ProfissionaisService } from 'src/app/services/profissionais/profissionais.service';

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

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  private map: HTMLElement;

  public profissionaisOfSearch: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService,
    public userService: UserService,
    private geolocation: Geolocation,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private profissionalService: ProfissionaisService
  ) {

  }

  ngOnInit() {
    setTimeout(() => this.configSearchInput(), 1000);
  }

  ionViewDidEnter() {
    this.mapService.getAddress();
    this.configMap();
  }

  private configMap() {
    this.map = document.getElementById('map');
    if (this.map) {
      this.mapService.requestFullPermission(this.map).then(() => {
        this.mapService.map.on('load', () => {
          console.log('Caiu load home');
          this.mapService.markePointers(this.route.snapshot.data.profissionais.data.profissionais);
        })
      })
      /* this.mapService.initializeMap(this.map).then(() => {
        
      }); */
    }
  }

  private configSearchInput() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((nome: string) => {
      if (nome === '' || nome.length === 1) {
        this.profissionaisOfSearch = []
      } else {
        this.profissionalService.getAllByName(nome).subscribe((response: any) => {
          if (response.errors) {
            console.error(response.errors);
          } else {
            this.profissionaisOfSearch = response.data.profissionaisByName;
          }
        }, (error) => console.error(error));
      }
    });
  }

  public setFocusOnProfissional(latitude: number, longitude: number) {
    this.mapService.map.flyTo({
      center: [longitude, latitude],
      zoom: 16
    });
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

  public flyToPosition(): void {
    this.mapService.removeMyMarker();
    const gpsOptions: GeolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 15000,
      timeout: 10000
    }

    this.geolocation.getCurrentPosition(gpsOptions).then(({ coords }) => {
      this.mapService.map.flyTo({ center: [coords.longitude, coords.latitude] });
      this.mapService.markUserPosition();
    })
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
    /* if ((event.target.attributes.length !== 0) && (event.target.attributes[0].value === 'round')) {
      this.modalCtrl.create({
        component: SelecaoServicoPage,
        mode: 'ios'
      }).then((modal) => {
        modal.present();
      });
    } */
  }

  public openMenu(): void {
    this.modalCtrl.create({
      component: CustomMenuComponent,
      enterAnimation: topDownAnimation,
      leaveAnimation: downTopAnimation
    }).then((modal) => modal.present());
  }
}
