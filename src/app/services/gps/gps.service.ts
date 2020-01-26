import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  constructor(
    private platform: Platform,
    private locationAccuracy: LocationAccuracy
  ) {

  }

  public async ativarGps() {
    if (this.platform.is('android') || this.platform.is('ios') && document.URL.startsWith('http://localhost:81')) {
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    }
  }
}
