import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { MapService } from './services/map/map.service';
import { GpsService } from './services/gps/gps.service';
import { NetworkService } from './services/network/network.service';
import { LoginService } from './services/login/login.service';

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
    private statusBar: StatusBar,
    private gpsService: GpsService,
    private mapService: MapService,
    private network: NetworkService,
    private menuCtrl: MenuController,
    private splashScreen: SplashScreen,
    public loginService: LoginService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.hide();
      this.network.initializeNetworkEvents();
      
      this.gpsService.ativarGps().then((response) => {
        console.log("Mapa inicializado");
        this.mapService.initializeMap();
      }, (error) => console.error(error));
    });
  }

  public toggleMenu() {
    this.menuCtrl.toggle();
  }

  public navigatePage(page: string) {
    if (page === "perfil") {
      this.router.navigateByUrl("home/perfil");
    } else if (page === "cartao") {
      this.router.navigateByUrl("home/cartoes");
    } else if (page === "historico") {
      this.router.navigateByUrl("home/historico");
    } else if (page === 'agenda') {
      this.router.navigateByUrl("home/agenda");
    }else if (page === "chat") {
      this.router.navigateByUrl("home/home-chat")
    }

    this.toggleMenu();
  }
}
