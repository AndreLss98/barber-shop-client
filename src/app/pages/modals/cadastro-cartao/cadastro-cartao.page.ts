import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import creditCardType from 'credit-card-type';

import { card } from 'src/app/models/cartao';
import { CartaoService } from 'src/app/services/cartao/cartao.service';

@Component({
  selector: 'app-cadastro-cartao',
  templateUrl: './cadastro-cartao.page.html',
  styleUrls: ['./cadastro-cartao.page.scss'],
})
export class CadastroCartaoPage implements OnInit {

  public formGroup: any;
  public caminhoBandeiraCartao: string;
  private cartao: card = new Object() as card;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private cardService: CartaoService
  ) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(26)]],
      numero: [null, [Validators.required, Validators.minLength(13), Validators.maxLength(20)]],
      data: ['', [Validators.required, Validators.maxLength(5)]],
      cvv: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      isForSave: [false]
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
    this.cartao.expDate = this.formGroup.value.data;
    this.cartao.numero = this.formGroup.value.numero;
    this.cartao.cvv = this.formGroup.value.cvv;
    
    if (this.formGroup.value.isForSave) {
      this.cardService.addCard(this.cartao);
    }
    this.modalCtrl.dismiss();
  }

}
