import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { GpsService } from './services/gps/gps.service';
import { UserService } from './services/user.service';
import { NetworkService } from './services/network/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private router: Router,
    private platform: Platform,
    private statusbar: StatusBar,
    private gpsService: GpsService,
    private network: NetworkService,
    public userService: UserService,
    private splashScreen: SplashScreen,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.statusbar.backgroundColorByHexString('#313131');
      }

      try {
        this.userService.user = JSON.parse(localStorage.getItem('user'));
        if (this.userService.user) {
          this.router.navigateByUrl('/login/home');
        }
      } catch (error) {
        console.log('Error: ', error);
      }
      
      this.splashScreen.hide();
      this.network.initializeNetworkEvents();
      this.gpsService.ativarGps().then((response) => {
      }, (error) => console.error(error));
    });
  }
}
