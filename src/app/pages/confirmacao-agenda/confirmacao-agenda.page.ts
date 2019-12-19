import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Pagamento } from 'src/app/classes/pagamento';

import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-confirmacao-agenda',
  templateUrl: './confirmacao-agenda.page.html',
  styleUrls: ['./confirmacao-agenda.page.scss'],
})
export class ConfirmacaoAgendaPage extends Pagamento {

  constructor(
    private route: Router,
    agendaService: AgendaService
  ) {
    super(agendaService);
  }

  public visualizeSchedule() {
    this.route.navigateByUrl('home/agenda');
  }

  public goHome() {
    this.route.navigateByUrl('login/home');
  }

}
