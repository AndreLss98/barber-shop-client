import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { UserService } from 'src/app/services/user.service';
import { CartaoService } from 'src/app/services/cartao/cartao.service';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { CalendarioService } from 'src/app/services/calendario/calendario.service';

import { card } from 'src/app/models/cartao.model';
import { NOME_MESES, HORARIOS, TIPOS_SERVICOS } from './../../../constants/constants';

import { CadastroCartaoPage } from '../cadastro-cartao/cadastro-cartao.page';

@Component({
  selector: 'app-selecao-servico',
  templateUrl: './selecao-servico.page.html',
  styleUrls: ['./selecao-servico.page.scss'],
})
export class SelecaoServicoPage implements OnInit {

  readonly HORARIOS = HORARIOS;
  readonly NOME_MESES = NOME_MESES;

  public slidesConfig = {
    slidesPerView: 4
  }

  public diaSelecionado: number;
  private dataAtual: Date = new Date();

  public mesSelecionado = [];
  public nomeMesSelecionado: string;
  public numeroMesSelecionado: number;

  public horarioSelecionado: number = null;
  
  private total: number = 0;
  public totalFormatado: string;
  
  public isHairSelecionado: boolean = false;
  public isBeardSelecionada: boolean = false;
  public isMustacheSelecionado: boolean = false;
  
  public pathHairSvg: string = 'assets/hair.svg';
  public pathBeardSvg: string = 'assets/beard.svg';
  public pathMustacheSvg: string = 'assets/mustache.svg';

  public profissionalValues: any[] = [];
  public valorServicoBarba: number = 0.0;
  public valorServicoCabelo: number = 0.0;
  public valorServicoBigode: number = 0.0;
  
  public idSocket: string;
  public idProfissional: number;
  public sessionCard: card;
  public lastFourDigits: string;
  
  public isDesactiveBtn: boolean = true;

  constructor(
    private route: Router,
    public userService: UserService,
    private cardService: CartaoService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private agendaService: AgendaService,
    private calendarioService: CalendarioService
  ) {

  }

  ngOnInit() {
    this.configValues();
    this.numeroMesSelecionado = this.dataAtual.getMonth();
    this.mesSelecionado = this.calendarioService.diasRestanteDoMesAtual(this.dataAtual);
    this.nomeMesSelecionado = NOME_MESES[this.numeroMesSelecionado];
    this.sessionCard = this.cardService.getSessionCard();
    if (!this.isEmpty(this.sessionCard)) {
      this.lastFourDigits = this.sessionCard.numero.substr(this.sessionCard.numero.length - 4);
    }
    this.formataValorTotal();
  }

  ngDoCheck() {
    if (this.diaSelecionado && this.horarioSelecionado && (this.isBeardSelecionada || this.isHairSelecionado || this.isMustacheSelecionado)) {
      this.isDesactiveBtn = false;
    } else {
      this.isDesactiveBtn = true;
    }
  }

  private configValues() {
    this.valorServicoCabelo = this.profissionalValues.find(servico => servico.idtiposervico === TIPOS_SERVICOS.CABELO).valor;
    this.valorServicoBarba = this.profissionalValues.find(servico => servico.idtiposervico === TIPOS_SERVICOS.BARBA).valor;
    this.valorServicoBigode = this.profissionalValues.find(servico => servico.idtiposervico === TIPOS_SERVICOS.BIGODE).valor;
  }

  public selectBeardService() {
    this.isBeardSelecionada = !this.isBeardSelecionada;
    if (this.isBeardSelecionada) {
      this.pathBeardSvg = 'assets/beard_black.svg';
      this.total += this.valorServicoBarba;
    } else {
      this.pathBeardSvg = 'assets/beard.svg';
      this.total -= this.valorServicoBarba;
    }
    this.formataValorTotal();
  }

  public selectHairService() {
    this.isHairSelecionado = !this.isHairSelecionado;
    if (this.isHairSelecionado) {
      this.pathHairSvg = 'assets/hair_black.svg';
      this.total += this.valorServicoCabelo;
    } else {
      this.pathHairSvg = 'assets/hair.svg';
      this.total -= this.valorServicoCabelo;
    }
    this.formataValorTotal();
  }

  public selectMustacheService() {
    this.isMustacheSelecionado = !this.isMustacheSelecionado;
    if (this.isMustacheSelecionado) {
      this.pathMustacheSvg = 'assets/mustache_black.svg';
      this.total += this.valorServicoBigode;
    } else {
      this.pathMustacheSvg = 'assets/mustache.svg';
      this.total -= this.valorServicoBigode;
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
    this.agendaService.newService.horario = HORARIOS[this.horarioSelecionado];
    this.agendaService.newService.dia = this.mesSelecionado[this.diaSelecionado].numero;
    this.agendaService.newService.idcartao = this.cardService.selectedSessionCard.idcartao;
    this.agendaService.newService.mes = this.nomeMesSelecionado.toLowerCase();
    this.agendaService.newService.ano = this.dataAtual.getFullYear();
    this.agendaService.newService.valortotal = this.total;
    this.agendaService.newService.idprofissional = this.idProfissional;
    this.agendaService.newService.idsocket = this.idSocket;
    if (this.isHairSelecionado) {
      this.agendaService.newService.servicos.push({ id: 1, nome: '' })
    }
    if (this.isBeardSelecionada) {
      this.agendaService.newService.servicos.push({ id: 2, nome: '' })
    }
    if (this.isMustacheSelecionado) {
      this.agendaService.newService.servicos.push({ id: 3, nome: '' })
    }
    this.modalCtrl.dismiss().then(() => {
      console.log(this.agendaService.newService);
      this.route.navigateByUrl('endereco-servico');
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

  public closeModal() {
    this.modalCtrl.dismiss();
  }

}
