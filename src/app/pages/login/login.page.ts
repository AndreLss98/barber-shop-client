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

  public email: string = '';
  public senha: string = '';

  constructor(
    private route: Router,
    private loginService: LoginService,
    private modalCtrl: ModalController,
  ) {

  }

  ngOnInit() {

  }

  public login() {
    this.loginService.login(this.email, this.senha).subscribe((cliente: any) => {
      //TODO: pesquisar uma forma de retornar o status do erro
      if (cliente.errors) {
        console.log(cliente.errors[0]);
      } else {
        this.loginService.usuario = cliente.data.loginCliente;
        this.route.navigate(['login/intro']);
      }
    }, (errors) => console.log(errors));
  }

  public recuperarSenha() {
    this.modalCtrl.create({
      component: RecuperarSenhaPage
    }).then((modal) => modal.present());
    
  }

}
