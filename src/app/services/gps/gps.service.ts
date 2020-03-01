import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  constructor(
    private platform: Platform,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
  ) {

  }

  public async ativarGps() {
    if ((this.platform.is('android') || this.platform.is('ios')) && !document.URL.startsWith('http://localhost:81')) {
      this.locationAccuracy.canRequest().then(() => {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
          this.geolocation.getCurrentPosition().then(() => {
            console.log('Gps Ativado');
          })
        });
      })
    }
  }
}
