import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';

import { NOME_MESES } from './../../constants/constants';
import { servico } from 'src/app/models/servico.model';

import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { CalendarioService } from 'src/app/services/calendario/calendario.service';

import { MesAgendaComponent } from 'src/app/components/popovers/mes-agenda/mes-agenda.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  
  readonly NOME_MESES = NOME_MESES;

  public slidesConfig = {
    slidesPerView: 7,
    spaceBetween: 20
  }

  public agenda: servico[] = [];
  public agendaFiltrada: servico[] = [];

  private dataAtual: Date = new Date();
  public anoSelecionado: number;
  public diasDoMes = [];
  public mesSelecionado: number;
  public nomeMesSelecionado: string;
  public diaSelecionado: number = null;

  constructor(
    private route: ActivatedRoute,
    private agendaService: AgendaService,
    private popoverCtrl: PopoverController,
    private calendarioService: CalendarioService,
  ) {

  }

  ngOnInit() {
    if (this.route.snapshot.data.agenda) {
      this.agenda = this.route.snapshot.data.agenda.data.agendaCliente;
    }
    this.configuraDataAtual();
    this.checkAgenda();
  }

  private configuraDataAtual() {
    this.anoSelecionado = this.dataAtual.getFullYear();
    this.setMonth(this.dataAtual.getMonth());
    this.selectDay({ numero: this.dataAtual.getDate() });
    this.diasDoMes = this.calendarioService.diasRestanteDoMesAtual(this.dataAtual);
  }

  public async presentPopOver(event) {
    await this.popoverCtrl.create({
      component: MesAgendaComponent,
      event,
      mode: 'ios'
    }).then((popover) => {
      popover.present();
      popover.onDidDismiss().then((popoverdata: any) => {
        this.setMonth(popoverdata.data);
      });
    });
  }

  private setMonth(month: number) {
    if (month >= this.mesSelecionado || !this.mesSelecionado) {
      this.mesSelecionado = month;
      this.nomeMesSelecionado = NOME_MESES[this.mesSelecionado];
    }
  }

  public selectDay({ numero }) {
    this.diaSelecionado = numero;
    this.agendaFiltrada = [];
    this.agenda.forEach(item => {
      if (item.dia === this.diaSelecionado) {
        this.agendaFiltrada.push(item);
      }
    });
  }

  public checkAgenda() {
    this.diasDoMes.forEach(dia => {
      this.agenda.forEach(agenda => {
        if (agenda.dia === dia.numero) {
          dia.hasService = true;
          return;
        }
      });
    });
  }

  private checkDiaAtual() {
    this.diasDoMes.forEach(dia => {
      if (dia.numero === this.diaSelecionado && this.agendaFiltrada.length === 0) {
        dia.hasService = false;
      }
    });
  }

  public onCancelService(event) {
    this.agendaService.cancelService(event.idservico).subscribe((response: any) => {
      if (response.error) {
        console.error(response.error);
      } else {
        const itemPos = this.agenda.findIndex(servico => servico.idservico === event.idservico);
        if (itemPos > -1) {
          this.agenda.splice(itemPos, 1);
          this.selectDay({ numero: this.diaSelecionado });
          this.checkDiaAtual();
        }
      }
    });
  }
}
