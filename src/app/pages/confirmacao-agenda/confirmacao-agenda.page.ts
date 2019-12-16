import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AgendaService } from './../../services/agenda/agenda.service';

@Component({
  selector: 'app-confirmacao-agenda',
  templateUrl: './confirmacao-agenda.page.html',
  styleUrls: ['./confirmacao-agenda.page.scss'],
})
export class ConfirmacaoAgendaPage implements OnInit {

  public currentDay;
  public currentMonth;
  public currentYear;

  constructor(private route: Router, private agendaService: AgendaService) {

  }

  ngOnInit() {
    /* this.currentDay = this.agendaService.getDay();
    this.currentYear = this.agendaService.getYear();
    this.currentMonth = this.agendaService.getMonthName(this.agendaService.getMonth()); */
  }

  public visualizeSchedule() {
    this.route.navigateByUrl('home/agenda');
  }

  public goHome() {
    this.route.navigateByUrl('login/home');
  }

}
