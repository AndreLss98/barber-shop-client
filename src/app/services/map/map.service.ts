import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import mapboxgl from 'mapbox-gl';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';

import { MAPBOX_TOKEN } from '../../../environments/environment';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _mapInstance;
  public profissionaisPointer: any[];

  private style = 'mapbox://styles/dionim/cjzwtgft014k41csdy9xmjcyq';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private geolocation: Geolocation,
  ) {
    mapboxgl.accessToken = MAPBOX_TOKEN;
  }

  get map(): any {
    return this._mapInstance;
  }

  public async initializeMap(map: HTMLElement) {
    const gpsOptions: GeolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 15000,
      timeout: 10000
    }

    await this.geolocation.getCurrentPosition(gpsOptions).then(async ({coords}) => {
      this._mapInstance = await new mapboxgl.Map({
        container: map,
        style: this.style,
        zoom: 14,
        center: [coords.longitude, coords.latitude]
      });
    });
  }

  public markePointers(pointers: any[]) {
    this.profissionaisPointer = pointers;
    this.profissionaisPointer.forEach(point => {
      new mapboxgl.Marker().setLngLat([point.longitude, point.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25,  closeButton: false})
      .setHTML(`<ion-grid><ion-row><ion-col class="ion-align-self-end" style="display: flex"><img src="/assets/imgs/man_model.jpg"></ion-col><ion-col class="ion-align-self-center"><ion-row><ion-col text-center><span>${point.nome}</span></ion-col></ion-row><ion-row><ion-col text-center><ion-button shape="round" size="small" class="map-item">Agendar</ion-button></ion-col></ion-row><ion-row><ion-col><ion-icon src="assets/custom_star.svg"></ion-icon><ion-icon src="assets/custom_star.svg"></ion-icon><ion-icon src="assets/custom_star.svg"></ion-icon></ion-col></ion-row></ion-col></ion-row></ion-grid>`))
      .addTo(this._mapInstance);
    })
  }

  public getAddress() {
    const gpsOptions: GeolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 15000,
      timeout: 10000
    }
    return this.geolocation.getCurrentPosition(gpsOptions).then((position: Geoposition) => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${MAPBOX_TOKEN}`;
      return this.http.get(url).subscribe((address: any) => {
        this.userService.user.endereco = address.features[0].place_name;
      });
    });
  }
}