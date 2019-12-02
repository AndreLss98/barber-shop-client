import { Component, OnInit, ViewChild } from '@angular/core';
import { CartaoService } from 'src/app/services/cartao/cartao.service';
import { IonSlides, AlertController, ModalController } from '@ionic/angular';
import { CadastroCartaoPage } from '../modals/cadastro-cartao/cadastro-cartao.page';

import { card } from 'src/app/models/cartao.model';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cartoes',
  templateUrl: './cartoes.page.html',
  styleUrls: ['./cartoes.page.scss'],
})
export class CartoesPage implements OnInit {

  @ViewChild(IonSlides, {static: false}) slides: IonSlides

  public cartoes = [];
  public sliderConfigs = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.3
  };

  constructor(
    private cardService: CartaoService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.fetchCards();
  }

  public fetchCards() {
    this.cardService.getCards(this.userService.user.idcliente).subscribe((cartoes: any) => {
      this.cartoes = this.cardService.getBandeiras(cartoes.data.cartoesCliente);
      console.log(this.cartoes);
    });
  }

  public async addCartao() {
    this.modalCtrl.create({
      component: CadastroCartaoPage
    }).then((modal) => {
      modal.present();
    });
  }

  public getCartaoBrand(cartao: card) {
    if (cartao.category === "MasterCard") {
      return "assets/logoMastercard.svg";
    } else {
      return "assets/logoVisacard.svg";
    }
  }

  public excluirCartao() {
    this.slides.getActiveIndex().then((resp) => {
      this.cartoes = this.cardService.deleteCard(resp);
      this.slides.update();
      this.showInfoAlert("Cartão excluido com sucesso!");
    })
  }

  public async showAlert(message: string) {
    let alertElement: HTMLIonAlertElement
    await this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: 'Não',
          handler: () => {

          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.excluirCartao();
          }
        }
      ],
      backdropDismiss: false
    }).then((alert) => {
      alertElement = alert
      alertElement.present();
    });
    alertElement.onDidDismiss().then(() => {
      
    });
  }

  public async showInfoAlert(message: string) {
    let alertElement: HTMLIonAlertElement
    this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

          }
        }
      ],
      backdropDismiss: false
    }).then((alert) => {
      alertElement = alert
      alertElement.present();
    });
  }

}
