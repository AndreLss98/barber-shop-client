import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder } from '@angular/forms';

import creditCardType from 'credit-card-type';

@Component({
  selector: 'app-cadastro-cartao',
  templateUrl: './cadastro-cartao.page.html',
  styleUrls: ['./cadastro-cartao.page.scss'],
})
export class CadastroCartaoPage implements OnInit {

  public formGroup: any;
  public caminhoBandeiraCartao: string;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(26)]],
      numero: [null, [Validators.required, Validators.minLength(13), Validators.maxLength(20)]],
      data: ['', [Validators.required, Validators.maxLength(4)]],
      cvv: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    })
  }

  ngOnInit() {

  }

  public backPage() {
    this.modalCtrl.dismiss();
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
        this.caminhoBandeiraCartao = './../../../../assets/logoVisacard.svg'
      } else if (dadosCartao[0].type === "mastercard") {
        this.caminhoBandeiraCartao = './../../../../assets/logoMastercard.svg'
      }
    } else {
      this.caminhoBandeiraCartao = '';
    }
  }

}
