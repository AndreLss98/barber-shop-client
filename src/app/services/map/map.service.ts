import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MAPBOX_TOKEN } from '../../../environments/environment';

import mapboxgl from 'mapbox-gl';

const gpsOptions = {
  maximumAge: 15000,
  timeout: 10000,
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map = { };
  private mapElement: HTMLElement = null;

  constructor(
    private geolocation: Geolocation
  ) {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    this.mapElement = document.createElement('div');
    this.mapElement.id = 'map';
    this.mapElement.style.height = '100%';
  }

  public getMap() {
    return this.map;
  }

  public setMap(mapObj: any) {
    this.map = mapObj;
  }

  public initializeMap() {
    console.log("Mapa Inicializado");
    this.geolocation.getCurrentPosition(gpsOptions).then((resp) => {
      let map = new mapboxgl.Map({
        container: this.mapElement,
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [resp.coords.longitude, resp.coords.latitude],
        zoom: 13
      });
      this.setMap({ mapElement: this.mapElement, map: map });
      return { mapElement: this.mapElement, map: map };
    }).catch((error) => {
      console.log("Falha de conexão de GPS");
      this.setMap({ error: error });
      return { error: error };
    });
  }
}
