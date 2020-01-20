import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-intro-modal',
  templateUrl: './intro-modal.page.html',
  styleUrls: ['./intro-modal.page.scss'],
})
export class IntroModalPage implements OnInit {

  public btnDesactive: boolean;
  private mapObj: any;

  constructor(
    private navCtrl: NavController
  ) {

  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {

  }
  
  ionViewDidEnter() {
    setTimeout(() => {
      this.navCtrl.navigateBack('login/home');
    }, 1000);

  }

}
