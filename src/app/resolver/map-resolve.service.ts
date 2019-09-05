import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import mapboxgl from 'mapbox-gl';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MAPBOX_TOKEN } from '../../environments/environment'

import { MapService } from '../services/map.service';
import { Platform } from '@ionic/angular';

const gpsOptions = {
  maximumAge: 2000,
  timeout: 1000,
  enableHighAccuracy: true
}

@Injectable({
  providedIn: 'root'
})
export class MapResolveService implements Resolve<any> {

  constructor(
    private geolocation: Geolocation,
    private mapService: MapService,
    private platform: Platform
  ) {

  }

  resolve() {
    return this.geolocation.getCurrentPosition(gpsOptions).then((resp) => {
      let mapElement = this.createElement();
      mapboxgl.accessToken = MAPBOX_TOKEN;
      let map = new mapboxgl.Map({
        container: mapElement,
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [resp.coords.longitude, resp.coords.latitude],
        zoom: 13
      });
      this.mapService.setMap({ mapElement: mapElement, map: map });
      return { mapElement: mapElement, map: map };
    }).catch((error) => {
      return error;
    });
  }

  private createElement(): HTMLElement {
    let element = document.createElement('div');
    element.id = 'map';
    element.style.height = "100%";
    element.style.width = this.platform.width().toString();
    return element;
  }
}
