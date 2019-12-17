import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ActionSheetController } from '@ionic/angular';

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
    slidesPerView: 7
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
    private agendaService: AgendaService,
    private popoverCtrl: PopoverController,
    private calendarioService: CalendarioService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    if (this.route.snapshot.data.agenda) {
      this.agenda = this.route.snapshot.data.agenda.data.agenda;
      console.log(this.agenda);
    }
    this.anoSelecionado = this.dataAtual.getFullYear();
    this.mesSelecionado = this.dataAtual.getMonth();
    this.selectDay({ numero: this.dataAtual.getDate() });
    this.nomeMesSelecionado = NOME_MESES[this.mesSelecionado];
    this.diasDoMes = this.calendarioService.diasRestanteDoMesAtual(this.dataAtual);
    this.checkAgenda();
  }

  public async presentPopOver(event: Event) {
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
}
