import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  public pathBeardSvg: string = './../../../../assets/beard.svg';
  public pathHairSvg: string = './../../../../assets/hair.svg';
  public pathMustacheSvg: string = './../../../../assets/mustache.svg';
  public currentMoth;
  public moth = [];

  public horarios = [ '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00' ];

  constructor(private agendaService: AgendaService, private modaCtrl: ModalController, private route: Router, private modalCtrl: ModalController) {
    this.currentMoth = agendaService.getMonthName(this.agendaService.getMonth());
    this.moth = agendaService.constructMonth(this.agendaService.getDate());
  }

  ngOnInit() {
    this.formataValorTotal();
  }

  public closeModal() {
    this.modaCtrl.dismiss();
  }

  public selectBeardService() {
    this.isBeardSelecionada = !this.isBeardSelecionada;
    if (this.isBeardSelecionada) {
      this.pathBeardSvg = './../../../../assets/beard_black.svg';
      this.total += 20;
    } else {
      this.pathBeardSvg = './../../../../assets/beard.svg';
      this.total -= 20;
    }
    this.formataValorTotal();
  }

  public selectHairService() {
    this.isHairSelecionado = !this.isHairSelecionado;
    if (this.isHairSelecionado) {
      this.pathHairSvg = './../../../../assets/hair_black.svg';
      this.total += 30;
    } else {
      this.pathHairSvg = './../../../../assets/hair.svg';
      this.total -= 30;
    }
    this.formataValorTotal();
  }

  public selectMustacheService() {
    this.isMustacheSelecionado = !this.isMustacheSelecionado;
    if (this.isMustacheSelecionado) {
      this.pathMustacheSvg = './../../../../assets/mustache_black.svg';
      this.total += 15;
    } else {
      this.pathMustacheSvg = './../../../../assets/mustache.svg';
      this.total -= 15;
    }
    this.formataValorTotal();
  }

  public formataValorTotal() {
    this.totalFormatado = Number(this.total).toFixed(2);
    this.totalFormatado = this.totalFormatado.replace('.', ',');
  }

  public requestService() {
    this.modaCtrl.dismiss().then(() => {
      this.route.navigateByUrl('load-atendimento');
    });
  }

}
