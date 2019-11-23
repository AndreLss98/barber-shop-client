import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { CartaoService } from 'src/app/services/cartao/cartao.service';
import { card } from 'src/app/models/cartao.model';
import { CadastroCartaoPage } from '../cadastro-cartao/cadastro-cartao.page';

@Component({
  selector: 'app-selecao-servico',
  templateUrl: './selecao-servico.page.html',
  styleUrls: ['./selecao-servico.page.scss'],
})
export class SelecaoServicoPage implements OnInit {

  public slidesConfig = {
    slidesPerView: 4
  }
  public diaSelecionado: number = null;
  public horarioSelecionado: number = null;
  private total: number = 0;
  public totalFormatado: string;
  public isBeardSelecionada: boolean = false;
  public isHairSelecionado: boolean = false;
  public isMustacheSelecionado: boolean = false;
  public pathBeardSvg: string = 'assets/beard.svg';
  public pathHairSvg: string = 'assets/hair.svg';
  public pathMustacheSvg: string = 'assets/mustache.svg';
  public currentMoth;
  public month = [];
  public horarios = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  public isDesactiveBtn: boolean = true;
  public sessionCard: card;
  public lastFourDigits: string;

  constructor(
    private route: Router,
    private modaCtrl: ModalController,
    private cardService: CartaoService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private agendaService: AgendaService,
  ) {
    this.currentMoth = agendaService.getMonthName(this.agendaService.getMonth());
    this.month = agendaService.constructMonth(this.agendaService.getDate());
    this.sessionCard = this.cardService.getSessionCard();

    if (!this.isEmpty(this.sessionCard)) {
      this.lastFourDigits = this.sessionCard.numero.substr(this.sessionCard.numero.length - 4);
    }
  }

  ngOnInit() {
    this.formataValorTotal();
  }

  ngDoCheck() {
    if (this.diaSelecionado && this.horarioSelecionado && (this.isBeardSelecionada || this.isHairSelecionado || this.isMustacheSelecionado)) {
      this.isDesactiveBtn = false;
    } else {
      this.isDesactiveBtn = true;
    }
  }

  public closeModal() {
    this.modaCtrl.dismiss();
  }

  public selectBeardService() {
    this.isBeardSelecionada = !this.isBeardSelecionada;
    if (this.isBeardSelecionada) {
      this.pathBeardSvg = 'assets/beard_black.svg';
      this.total += 20;
    } else {
      this.pathBeardSvg = 'assets/beard.svg';
      this.total -= 20;
    }
    this.formataValorTotal();
  }

  public selectHairService() {
    this.isHairSelecionado = !this.isHairSelecionado;
    if (this.isHairSelecionado) {
      this.pathHairSvg = 'assets/hair_black.svg';
      this.total += 30;
    } else {
      this.pathHairSvg = 'assets/hair.svg';
      this.total -= 30;
    }
    this.formataValorTotal();
  }

  public selectMustacheService() {
    this.isMustacheSelecionado = !this.isMustacheSelecionado;
    if (this.isMustacheSelecionado) {
      this.pathMustacheSvg = 'assets/mustache_black.svg';
      this.total += 15;
    } else {
      this.pathMustacheSvg = 'assets/mustache.svg';
      this.total -= 15;
    }
    this.formataValorTotal();
  }

  public formataValorTotal() {
    this.totalFormatado = Number(this.total).toFixed(2);
    this.totalFormatado = this.totalFormatado.replace('.', ',');
  }

  public requestService(): void {
    if ((this.horarioSelecionado === undefined || this.horarioSelecionado === null) || (this.diaSelecionado === undefined || this.diaSelecionado === null)) {
      this.showAlert('Por favor escolha o dia e horário.');
      return;
    }
    if (!this.isBeardSelecionada && !this.isHairSelecionado && !this.isMustacheSelecionado) {
      this.showAlert('Por favor escolha o tipo de serviço');
      return;
    }
    if (this.sessionCard == null || this.sessionCard == undefined || this.isEmpty(this.sessionCard)) {
      this.showCardAlert();
      return;
    }
    this.modaCtrl.dismiss().then(() => {
      this.route.navigateByUrl('load-atendimento');
    });
  }

  public isEmpty(obj) {
    for (let propertie in obj) {
      if (obj.hasOwnProperty(propertie)) {
        return false;
      }
    }
    return true;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      header: 'Atenção',
      message: message,
      buttons:
        [
          {
            text: 'OK'
          }
        ],
      backdropDismiss: false,
      mode: 'ios'
    }).then((alert) => alert.present());
  }

  private showCardAlert(): void {
    this.alertCtrl.create({
      header: 'Forma de pagamento não informado!',
      message: 'Deseja cadastrar seu cartão de crédito?',
      buttons:
        [
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {

            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.modalCtrl.create({ component: CadastroCartaoPage }).then((modal) => modal.present().then(() => {
                modal.onDidDismiss().then(() => {
                  this.sessionCard = this.cardService.getSessionCard();
                  if (!this.isEmpty(this.sessionCard)) {
                    this.lastFourDigits = this.sessionCard.numero.substr(this.sessionCard.numero.length - 4);
                  }
                })
              }));
            }
          }
        ],
      backdropDismiss: false,
      mode: 'ios'
    }).then((alert) => alert.present());
  }

}
