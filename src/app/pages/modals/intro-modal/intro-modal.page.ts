import { Component, OnInit } from '@angular/core';

import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-modal',
  templateUrl: './intro-modal.page.html',
  styleUrls: ['./intro-modal.page.scss'],
})
export class IntroModalPage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) { 

  }

  ngOnInit() {
    
  }

  public closeModal(): void {
    this.navCtrl.navigateBack('login/home');
  }

}
