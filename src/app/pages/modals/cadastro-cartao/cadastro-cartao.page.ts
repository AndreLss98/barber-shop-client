import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import creditCardType from 'credit-card-type';

import { cartao } from './../../../models/cliente.model';
import { UserService } from 'src/app/services/user.service';
import { CartaoService } from 'src/app/services/cartao/cartao.service';

@Component({
  selector: 'app-cadastro-cartao',
  templateUrl: './cadastro-cartao.page.html',
  styleUrls: ['./cadastro-cartao.page.scss'],
})
export class CadastroCartaoPage implements OnInit {

  @ViewChild('nomeInput', { static: false }) nome;
  @ViewChild('numeroCartao', { static: false }) numeroCartao;
  @ViewChild('dataValidade', { static: false }) dataValidade;
  @ViewChild('cvv', { static: false }) cvv;

  public formGroup: any;
  public caminhoBandeiraCartao: string;
  private cartao: cartao = new Object() as cartao;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private cardService: CartaoService,
    private modalCtrl: ModalController,
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(26)]],
      numero: [null, [Validators.required, Validators.minLength(13), Validators.maxLength(20)]],
      data: ['', [Validators.required, Validators.maxLength(5)]],
      cvv: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      isForSave: [false]
    });
  }

  ngOnInit() {

  }

  public nomeToUppercase() {
    this.nome.value = this.nome.value.toUpperCase().replace(/(\d)/g, '');
  }

  public formatCardNumber() {
    this.numeroCartao.value = this.numeroCartao.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  public formatDataValidade() {
    this.dataValidade.value = this.dataValidade.value.replace(/([0-9]{2})(\d)/, '$1/$2').trim();
  }

  public formatCVV() {
    this.cvv.value = this.cvv.value.replace(/([^\dA-Z])/g, '');
  }

  public getBandeira(cardNumber: string) {
      let numeroBandeira;
      if (cardNumber && cardNumber.length >= 4) {
        numeroBandeira = cardNumber.substring(0, 4);
        this.showBandeira(creditCardType(numeroBandeira));
      } else {
        this.caminhoBandeiraCartao = '';
      }
  }

  public showBandeira(dadosCartao) {
    if (dadosCartao && dadosCartao.length > 0) {
      if (dadosCartao[0].type === "visa") {
        this.caminhoBandeiraCartao = 'assets/logoVisacard.svg';
        this.cartao.category = "Visa";
      } else if (dadosCartao[0].type === "mastercard") {
        this.caminhoBandeiraCartao = 'assets/logoMastercard.svg';
        this.cartao.category = "MasterCard";
      }
    } else {
      this.caminhoBandeiraCartao = '';
    }
  }

  public cadastrarCartao() {
    this.cartao.nome = this.formGroup.value.nome;
    this.cartao.datavalidade = this.formGroup.value.data;
    this.cartao.numero = this.formGroup.value.numero;
    this.cartao.cvv = this.formGroup.value.cvv;
    
    if (this.formGroup.value.isForSave) {
      console.log(this.formGroup.value);
      this.cardService.registerCard(this.userService.user, this.cartao).subscribe((cartao: any) => {
        if (cartao.errors) {
          const error = JSON.parse(cartao.errors[0].message);
          this.showAlert(error.message);
        } else {
          this.cardService.updateLocalCards(cartao.data.registerCard);
          this.userService.user.cartoes = cartao.data.registerCard;
          localStorage.setItem('user', JSON.stringify(this.userService.user));
          this.showAlert("Cartão cadastrado com sucesso!");
        }
      }, (error) => console.log('Erro ao cadastrar cartao: ', error));
    } else {
      this.cardService.updateLocalCards(this.cartao);
      this.showAlert("Cartão cadastrado com sucesso!");
    }
  }

  public closeModal(): void {
    this.modalCtrl.dismiss();
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message,
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {

          }
        }
      ]
    }).then((alert) => {
      alert.present();
      alert.onDidDismiss().then(() => this.closeModal());
    });
  }

}
