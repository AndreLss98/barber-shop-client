import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import mapboxgl from 'mapbox-gl';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MAPBOX_TOKEN } from '../../environments/environment'

import { MapService } from '../services/map/map.service';
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
    
  }
}
