import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { NOME_MESES } from './../../constants/constants';

import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-falha-pagamento',
  templateUrl: './falha-pagamento.page.html',
  styleUrls: ['./falha-pagamento.page.scss'],
})
export class FalhaPagamentoPage implements OnInit {

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

  public goHome() {
    this.route.navigateByUrl('login/home');
  }

}
