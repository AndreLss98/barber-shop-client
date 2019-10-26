import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-falha-pagamento',
  templateUrl: './falha-pagamento.page.html',
  styleUrls: ['./falha-pagamento.page.scss'],
})
export class FalhaPagamentoPage implements OnInit {

  public currentDay;
  public currentMonth;
  public currentYear;

  constructor(private route: Router, private agendaService: AgendaService) {

  }

  ngOnInit() {
    this.currentDay = this.agendaService.getDay();
    this.currentYear = this.agendaService.getYear();
    this.currentMonth = this.agendaService.getMonthName(this.agendaService.getMonth());
  }

  public goHome() {
    this.route.navigateByUrl('login/home');
  }

}
