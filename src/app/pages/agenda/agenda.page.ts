import { Component, OnInit } from '@angular/core';

import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { itemAgenda } from 'src/app/models/itemAgenda';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  public agenda: itemAgenda[];

  constructor(
    private agendaService: AgendaService
  ) { 

  }

  ngOnInit() {
    this.agenda = this.agendaService.getAgenda();
  }

}
