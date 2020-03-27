import { fromEvent } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { topDownAnimation } from 'src/app/animations/top-down-animation';
import { downTopAnimation } from 'src/app/animations/down-top-animation';

import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';

import { UserService } from 'src/app/services/user.service';
import { MapService } from 'src/app/services/map/map.service';
import { ProfissionaisService } from 'src/app/services/profissionais/profissionais.service';

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

  private async configMap() {
    this.map = document.getElementById('map');
    if (this.map) {
      await this.mapService.requestFullPermission(this.map).then(async () => {
        await this.mapService.map.on('load', () => {
          console.log('Profissionais: ', this.route.snapshot);
          this.mapService.markePointers(this.route.snapshot.data.profissionais.data.profissionais);
        })
      });
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
        this.fetchProfissionais(nome);
      }
    });
  }

  public fetchProfissionais(nome: string) {
    this.profissionalService.getAllByName(nome).subscribe((response: any) => {
      if (response.errors) {
        console.error(response.errors);
      } else {
        this.profissionaisOfSearch = response.data.profissionaisByName;
        if (this.profissionaisOfSearch.length === 1) this.setFocusOnProfissional(this.profissionaisOfSearch[0].latitude, this.profissionaisOfSearch[0].longitude);
        if (this.profissionaisOfSearch.length === 0) this.showAlert('Aviso', '', 'Barbeiro não encontrado.');
      }
    }, (error) => console.error(error));
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

  private async showAlert(header: string, subHeader: string, message: string) {
    this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      mode: 'ios',
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

  public openMenu(): void {
    this.modalCtrl.create({
      component: CustomMenuComponent,
      enterAnimation: topDownAnimation,
      leaveAnimation: downTopAnimation
    }).then((modal) => modal.present());
  }
}
