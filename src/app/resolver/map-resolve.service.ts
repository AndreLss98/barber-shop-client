import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import mapboxgl from 'mapbox-gl';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class MapResolveService implements Resolve<any> {

  constructor(
    private geolocation: Geolocation
  ) {

  }

  resolve() {
    let mapElement = document.createElement('div');
    mapElement.id = `map`;
    mapElement.style.height = '100%';
    this.getAtualPosition().then(data => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZGlvbmltIiwiYSI6ImNqejA0Mm54OTA0MHkzb3Fpemo5cnhmYWcifQ.gbYcjV1OcISZp1Ym1xw8pw';
       new mapboxgl.Map({
        container: mapElement,
        style: 'mapbox://styles/dionim/cjzwtgft014k41csdy9xmjcyq',
        center: [data.longitude, data.latitude],
        zoom: 12
      })
    }).finally(() => {
      
    });
    return mapElement;
  }

  private async getAtualPosition() {
    return await this.geolocation.getCurrentPosition().then((resp) => {
      return resp.coords;
    })
  }

}
