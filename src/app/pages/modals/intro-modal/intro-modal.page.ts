import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-intro-modal',
  templateUrl: './intro-modal.page.html',
  styleUrls: ['./intro-modal.page.scss'],
})
export class IntroModalPage implements OnInit {

  public btnDesactive: boolean;
  private mapObj: any;

  constructor(
    private navCtrl: NavController,
    private mapService: MapService
  ) { 
    this.btnDesactive = true;
  }

  ionViewWillEnter() {
    this.mapObj = this.mapService.getMap();
  }
  
  ionViewDidEnter() {
    if (this.mapObj.map.loaded()) {
      this.btnDesactive = false;
    } else {
      this.mapObj.map.on('load', () => {
        this.navCtrl.navigateBack('login/home');
      });
    }
  }

  ngOnInit() {
    
  }

  public closeModal(): void {
    if (this.mapObj.map && this.mapObj.map.loaded()) {
      
      console.log("Carregou");
    } else {
      console.log("Nao Carregou");
    }
  }

  private toggleBtn() {
    this.btnDesactive = !this.btnDesactive;
    console.log("Valor atual: ", this.btnDesactive);
  }

}
