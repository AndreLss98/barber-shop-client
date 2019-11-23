import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { RecuperarSenhaPage } from '../modals/recuperar-senha/recuperar-senha.page';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user.service';
import { ConectionStatusPage } from '../modals/conection-status/conection-status.page';

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
    private userService: UserService,
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
        const error = JSON.parse(cliente.errors[0].message);
        console.log(error);
      } else {
        this.userService.user = cliente.data.loginCliente;
        this.route.navigate(['login/intro']);
      }
    }, (errors) => {
      console.log(errors);
      if (errors.name === 'TimeoutError') {
        this.connectionError();
      }
    });
  }

  public recuperarSenha() {
    this.modalCtrl.create({ component: RecuperarSenhaPage }).then((modal) => modal.present());
  }

  private connectionError(): void {
    this.modalCtrl.create({ component: ConectionStatusPage }).then((modal) => modal.present());
  }

}
