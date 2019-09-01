import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { RecuperarSenhaPage } from '../modals/recuperar-senha/recuperar-senha.page';

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

  public async recuperarSenha() {
    const modal = await this.modalCtrl.create({
      component: RecuperarSenhaPage
    });

    modal.present();
  }

}
