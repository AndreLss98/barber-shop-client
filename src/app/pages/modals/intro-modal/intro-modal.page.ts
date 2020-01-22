import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro-modal',
  templateUrl: './intro-modal.page.html',
  styleUrls: ['./intro-modal.page.scss'],
})
export class IntroModalPage implements OnInit {

  public btnDesactive: boolean;

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
    }, 500);

  }

}
