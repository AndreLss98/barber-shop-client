import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ActionSheetController } from '@ionic/angular';

import { NOME_MESES } from './../../constants/constants';
import { itemAgenda, itemDateAgenda } from 'src/app/models/itemAgenda';

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

  public agenda: itemDateAgenda[] = [];
  public agendaFiltrada: itemAgenda[] = [];

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
    console.log(this.route.snapshot);
    this.anoSelecionado = this.dataAtual.getFullYear();
    this.mesSelecionado = this.dataAtual.getMonth();
    this.nomeMesSelecionado = NOME_MESES[this.mesSelecionado];
    this.diasDoMes = this.calendarioService.diasRestanteDoMesAtual(this.dataAtual);
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
  public selectDay(day, pos) {
    
  }

  public checkAgenda() {
    this.diasDoMes.forEach(element => {
      this.agenda.forEach(agenda => {
        if (agenda.day === element.day) {
          element.hasService = true;
          return;
        }
      })
    });
  }
}
