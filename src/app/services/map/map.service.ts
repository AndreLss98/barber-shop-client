import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MAPBOX_TOKEN } from '../../../environments/environment';

import mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from 'src/app/classes/map';
import { MARKERS } from 'src/app/constants/mock-markers';

const gpsOptions = {
  maximumAge: 15000,
  timeout: 10000
}

const SOURCE_MARKERS_NAME = 'markers';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private markers: GeoJson[] = [];

  private mapObj: any = {};
  private style = 'mapbox://styles/dionim/cjzwtgft014k41csdy9xmjcyq';
  private mapElement: HTMLElement = null;

  constructor(
    private geolocation: Geolocation
  ) {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    this.mapElement = document.createElement('div');
    this.mapElement.id = 'map';
    this.mapElement.style.height = '100%';

    this.markers = JSON.parse(MARKERS);
  }

  public getMap() {
    return this.mapObj;
  }

  public setMap(mapObj: any) {
    this.mapObj = mapObj;
  }

  public async initializeMap() {
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
        const popup = new mapboxgl.Popup({ closeButton: false });
        popup.setLngLat(position.lngLat).setHTML(`<h1>MapPoint</h1>`).addTo(map);
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
    const data = new FeatureCollection(this.getMarkers());
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
    return this.markers;
  }

  private pushNewMarker(newMarker: GeoJson) {
    this.markers.push(newMarker);
    console.log(JSON.stringify(this.markers));
  }
}