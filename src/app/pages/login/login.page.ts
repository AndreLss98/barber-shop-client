import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';

import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { LoginService } from 'src/app/services/login/login.service';

import { RecuperarSenhaPage } from '../modals/recuperar-senha/recuperar-senha.page';
import { ConectionStatusPage } from '../modals/conection-status/conection-status.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: string = '';
  public senha: string = '';

  public tipoCampoSenha: string = 'password';
  public iconSenha: string = 'assets/icon_hide_senha.svg';

  private loader;

  constructor(
    private route: Router,
    private chatService: ChatService,
    private userService: UserService,
    private loginService: LoginService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) {

  }

  ngOnInit() {

  }

  public async login() {
    await this.showLoading();
    this.loginService.login(this.email, this.senha).subscribe(async (cliente: any) => {
      //TODO: pesquisar uma forma de retornar o status do erro
      await this.cloaseLoading();
      if (cliente.errors) {
        const error = JSON.parse(cliente.errors[0].message);
        console.log('Error: ', error);
        this.showAlert(error.message);
      } else {
        console.log('Cliente: ', cliente);
        this.userService.user = cliente.data.loginCliente;
        localStorage.setItem('user', JSON.stringify(cliente.data.loginCliente));
        this.route.navigate(['login/intro']).then(() => {
          this.chatService.afterLogin();
        });
      }
    }, async (errors) => {
      console.log(errors);
      await this.cloaseLoading();
      if (errors.name === 'TimeoutError' || errors.name === 'HttpErrorResponse') {
        this.connectionError();
      }
    });
  }

  public toogleFieldType() {
    this.tipoCampoSenha === 'password'? this.tipoCampoSenha = 'text' : this.tipoCampoSenha = 'password';
    this.iconSenha === 'assets/icon_hide_senha.svg'? this.iconSenha = 'assets/icon_show_senha.svg' : this.iconSenha = 'assets/icon_hide_senha.svg';
  }

  public recuperarSenha() {
    this.modalCtrl.create({ component: RecuperarSenhaPage }).then((modal) => modal.present());
  }

  private connectionError(): void {
    this.modalCtrl.create({ component: ConectionStatusPage }).then((modal) => modal.present());
  }

  public async showLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Logando',
      mode: 'md'
    });
    this.loader.present();
  }

  public async cloaseLoading() {
    await this.loader.dismiss();
  }

  public showAlert(message: string) {
    this.alertCtrl.create({
      mode: 'ios',
      message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {}
        }
      ]
    }).then((alert) => {
      alert.present();
    })
  }

}
