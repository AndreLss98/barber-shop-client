import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Pagamento } from 'src/app/classes/pagamento';

import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-falha-pagamento',
  templateUrl: './falha-pagamento.page.html',
  styleUrls: ['./falha-pagamento.page.scss'],
})
export class FalhaPagamentoPage extends Pagamento {

  constructor(agendaService: AgendaService, private route: Router) {
    super(agendaService);
  }

  public goHome() {
    this.route.navigateByUrl('login/home');
  }

}
