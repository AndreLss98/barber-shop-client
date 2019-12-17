import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GeoJson, FeatureCollection } from 'src/app/classes/map';

import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';

import { MARKERS } from 'src/app/constants/mock-markers';
import { MAPBOX_TOKEN } from '../../../environments/environment';

import mapboxgl from 'mapbox-gl';
import { UserService } from '../user.service';

const SOURCE_MARKERS_NAME = 'markers';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private markers: GeoJson[] = [];

  private mapObj: any = null;
  private style = 'mapbox://styles/dionim/cjzwtgft014k41csdy9xmjcyq';
  private mapElement: HTMLElement = null;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private geolocation: Geolocation,
  ) {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    this.mapElement = document.createElement('div');
    this.mapElement.id = 'map';
    this.mapElement.style.height = '100%';

    // this.markers = JSON.parse(MARKERS);
  }

  public getMap() {
    return this.mapObj;
  }

  public setMap(mapObj: any) {
    this.mapObj = mapObj;
  }

  public async initializeMap() {

    const gpsOptions: GeolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 15000,
      timeout: 10000
    }

    await this.geolocation.getCurrentPosition(gpsOptions).then((position) => {
      let map = this.buildMap(position);
      this.setMap({ mapElement: this.mapElement, map: map });
      map.on('load', (event) => {
        this.createSourceMarkers(map);
        this.createMapLayer(map);
      });
      return { mapElement: this.mapElement, map: map };
    }).catch((error) => {
      console.log("Falha de conexão de GPS");
      this.setMap({ error: error });
      return { error: error };
    });
  }

  private buildMap(position) {
    let map = new mapboxgl.Map({
      container: this.mapElement,
      style: this.style,
      center: [position.coords.longitude, position.coords.latitude],
      zoom: 13
    });

    map.on('click', (position) => {
      const result = map.queryRenderedFeatures(position.point, { layers: ['Points'] });
      if (result.length) {
        const content = result[0].properties;
        const popup = new mapboxgl.Popup({ closeButton: false });
        const coordinates = result[0].geometry.coordinates.slice();
        while (Math.abs(position.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += position.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        popup.setLngLat(coordinates).setHTML(this.generateHTMLItemToMap(content['nome'])).addTo(map);
      }
    });
    return map;
  }

  private createSourceMarkers(map) {
    map.addSource(SOURCE_MARKERS_NAME, {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': []
      }
    });
    const data = new FeatureCollection(JSON.parse(this.getMarkers()));
    map.getSource(SOURCE_MARKERS_NAME).setData(data);
  }

  private createMapLayer(map) {
    map.addLayer({
      "id": "Points",
      "source": SOURCE_MARKERS_NAME,
      "type": "symbol",
      "layout": {
        "icon-image": "red_location"
      }
    });
  }

  private getMarkers() {
    // return this.markers;
    return MARKERS;
  }

  private generateHTMLItemToMap(name: string): string {
    return `<ion-grid><ion-row><ion-col class="ion-align-self-end" style="display: flex"><img src="/assets/imgs/man_model.jpg"></ion-col><ion-col class="ion-align-self-center"><ion-row><ion-col text-center><span>${name}</span></ion-col></ion-row><ion-row><ion-col text-center><ion-button shape="round" size="small" class="map-item">Agendar</ion-button></ion-col></ion-row><ion-row><ion-col><ion-icon src="assets/custom_star.svg"></ion-icon><ion-icon src="assets/custom_star.svg"></ion-icon><ion-icon src="assets/custom_star.svg"></ion-icon></ion-col></ion-row></ion-col></ion-row></ion-grid>`;
  }

  public myConsole() {
    console.log("Foi chamada a funcao");
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
        console.log(address);
        this.userService.user.endereco = address.features[0].place_name;
      });
    });
  }
}