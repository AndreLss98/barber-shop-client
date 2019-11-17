import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { RecuperarSenhaPage } from '../modals/recuperar-senha/recuperar-senha.page';
import { LoginService } from 'src/app/services/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private route: Router,
    private loginService: LoginService,
    private modalCtrl: ModalController,
  ) {

  }

  ngOnInit() {

  }

  public login() {
    this.loginService.login('aistiger.98@gmail.com', '123456').subscribe((cliente: any) => {
      this.loginService.usuario = cliente.data.loginCliente;
      this.route.navigate(['login/intro']);
    });
  }

  public recuperarSenha() {
    this.modalCtrl.create({
      component: RecuperarSenhaPage
    }).then((modal) => modal.present());
    
  }

}
