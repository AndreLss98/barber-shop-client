import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { RecuperarSenhaPage } from '../modals/recuperar-senha/recuperar-senha.page';
import { ConectionStatusPage } from '../modals/conection-status/conection-status.page';

import { topDownAnimation } from '../../animations/top-down-animation';
import { downTopAnimation } from './../../animations/down-top-animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private route: Router,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {

  }

  public login() {
    this.route.navigate(['login/intro']);
  }

  public recuperarSenha() {
    /* this.modalCtrl.create({
      component: RecuperarSenhaPage
    }).then((modal) => modal.present()); */
    this.modalCtrl.create({
      component: ConectionStatusPage,
      enterAnimation: topDownAnimation,
      leaveAnimation: downTopAnimation
    }).then((modal) => modal.present());
  }

}
