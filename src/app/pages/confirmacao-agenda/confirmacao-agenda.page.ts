import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { NOME_MESES } from './../../constants/constants';

import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-confirmacao-agenda',
  templateUrl: './confirmacao-agenda.page.html',
  styleUrls: ['./confirmacao-agenda.page.scss'],
})
export class ConfirmacaoAgendaPage implements OnInit {

  readonly NOME_MESES = NOME_MESES;
  private dataAtual: Date = new Date();
  public diaAtual: number;
  public anoAtual: number;
  private numeroMesAtual: number;
  public nomeMesAtual: string = '';

  public valor: string;

  constructor(
    private route: Router,
    private agendaService: AgendaService
    ) {

  }

  ngOnInit() {
    this.valor = Number(this.agendaService.newService.valortotal).toFixed(2).replace('.', ',');
    this.diaAtual = this.dataAtual.getDate();
    this.anoAtual = this.dataAtual.getFullYear();
    this.numeroMesAtual = this.dataAtual.getMonth();
    this.nomeMesAtual = NOME_MESES[this.numeroMesAtual];
  }

  public visualizeSchedule() {
    this.route.navigateByUrl('home/agenda');
  }

  public goHome() {
    this.route.navigateByUrl('login/home');
  }

}
